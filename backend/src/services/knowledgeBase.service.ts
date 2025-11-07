import KnowledgeBase from '../models/KnowledgeBase';
import FAQ from '../models/FAQ';
import Website from '../models/Website';
import File from '../models/File';
import { AppError } from '../middleware/error.middleware';
import Papa from 'papaparse';

export class KnowledgeBaseService {
  // List all knowledge bases
  async findAll() {
    const knowledgeBases = await KnowledgeBase.find().sort({ createdAt: -1 }).lean();

    const kbWithCounts = await Promise.all(
      knowledgeBases.map(async (kb: any) => {
        const faqCount = await FAQ.countDocuments({ knowledgeBaseId: kb._id });
        const websiteCount = await Website.countDocuments({ knowledgeBaseId: kb._id });
        const fileCount = await File.countDocuments({ knowledgeBaseId: kb._id });

        return {
          ...kb,
          faqCount,
          websiteCount,
          fileCount
        };
      })
    );

    return kbWithCounts;
  }

  // Create knowledge base
  async create(name: string) {
    const kb = await KnowledgeBase.create({ name });
    return kb;
  }

  // Get space usage
  async getSpaceUsage(kbId: string) {
    const kb = await KnowledgeBase.findById(kbId);
    if (!kb) {
      throw new AppError(404, 'NOT_FOUND', 'Knowledge base not found');
    }

    const files = await File.find({ knowledgeBaseId: kbId });
    const websites = await Website.find({ knowledgeBaseId: kbId });
    const faqs = await FAQ.find({ knowledgeBaseId: kbId });

    const filesSize = files.reduce((sum, file) => sum + file.size, 0);
    
    // Estimate website content size
    const websitesSize = websites.reduce((sum, website) => {
      const pagesSize = website.pages.reduce((pSum, page) => {
        return pSum + (page.content?.length || 0) * 2; // Rough estimate: 2 bytes per character
      }, 0);
      return sum + pagesSize;
    }, 0);

    // Estimate FAQs size
    const faqsSize = faqs.reduce((sum, faq) => {
      return sum + ((faq.question.length + faq.answer.length) * 2);
    }, 0);

    const total = 104857600; // 100 MB
    const used = filesSize + websitesSize + faqsSize;

    return {
      total,
      used,
      available: total - used,
      percentage: (used / total) * 100,
      breakdown: {
        faqs: faqsSize,
        websites: websitesSize,
        files: filesSize
      }
    };
  }

  // ===== FAQ Methods =====

  async findAllFAQs(kbId: string, page = 1, limit = 20, search?: string) {
    const query: any = { knowledgeBaseId: kbId };

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const total = await FAQ.countDocuments(query);

    const faqs = await FAQ.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      items: faqs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };
  }

  async createFAQ(kbId: string, question: string, answer: string) {
    if (question.length > 300) {
      throw new AppError(400, 'VALIDATION_ERROR', 'Question must be 300 characters or less');
    }

    if (answer.length > 1200) {
      throw new AppError(400, 'VALIDATION_ERROR', 'Answer must be 1200 characters or less');
    }

    const faq = await FAQ.create({
      knowledgeBaseId: kbId,
      question,
      answer
    });

    return faq;
  }

  async updateFAQ(faqId: string, question?: string, answer?: string) {
    const faq = await FAQ.findById(faqId);
    if (!faq) {
      throw new AppError(404, 'NOT_FOUND', 'FAQ not found');
    }

    if (question) {
      if (question.length > 300) {
        throw new AppError(400, 'VALIDATION_ERROR', 'Question must be 300 characters or less');
      }
      faq.question = question;
    }

    if (answer) {
      if (answer.length > 1200) {
        throw new AppError(400, 'VALIDATION_ERROR', 'Answer must be 1200 characters or less');
      }
      faq.answer = answer;
    }

    await faq.save();
    return faq;
  }

  async deleteFAQ(faqId: string) {
    const faq = await FAQ.findByIdAndDelete(faqId);
    if (!faq) {
      throw new AppError(404, 'NOT_FOUND', 'FAQ not found');
    }

    return { message: 'FAQ deleted successfully' };
  }

  async importFAQsFromCSV(kbId: string, csvContent: string) {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const errors: any[] = [];

      Papa.parse(csvContent, {
        delimiter: ';',
        skipEmptyLines: true,
        complete: async (parseResult) => {
          const rows = parseResult.data as string[][];

          for (let i = 0; i < rows.length && i < 300; i++) {
            const row = rows[i];
            const question = row[0]?.trim();
            const answer = row[1]?.trim();

            if (!question || !answer) {
              errors.push({ row: i + 1, error: 'Missing question or answer' });
              continue;
            }

            if (question.length > 300) {
              errors.push({ row: i + 1, error: 'Question exceeds 300 characters' });
              continue;
            }

            if (answer.length > 1200) {
              errors.push({ row: i + 1, error: 'Answer exceeds 1200 characters' });
              continue;
            }

            try {
              await this.createFAQ(kbId, question, answer);
              results.push({ question, answer });
            } catch (error: any) {
              errors.push({ row: i + 1, error: error.message });
            }
          }

          resolve({
            imported: results.length,
            failed: errors.length,
            errors
          });
        },
        error: (error: any) => {
          reject(new AppError(400, 'VALIDATION_ERROR', `CSV parsing error: ${error.message}`));
        }
      });
    });
  }

  // ===== Website Methods =====

  async findAllWebsites(kbId: string) {
    const websites = await Website.find({ knowledgeBaseId: kbId })
      .sort({ createdAt: -1 })
      .lean();

    return websites;
  }

  async addWebsite(kbId: string, domain: string) {
    // Check if website already exists
    const existing = await Website.findOne({ knowledgeBaseId: kbId, domain });
    if (existing) {
      throw new AppError(409, 'DUPLICATE', 'Website already added');
    }

    const website = await Website.create({
      knowledgeBaseId: kbId,
      domain,
      pages: [],
      pagesCount: 0
    });

    return website;
  }

  async addWebsiteURLs(kbId: string, urls: string[]) {
    const websites = new Map<string, string[]>();

    // Group URLs by domain
    for (const url of urls) {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;

      if (!websites.has(domain)) {
        websites.set(domain, []);
      }
      websites.get(domain)!.push(url);
    }

    const results: any[] = [];

    for (const [domain, domainUrls] of websites.entries()) {
      let website = await Website.findOne({ knowledgeBaseId: kbId, domain });

      if (!website) {
        website = await Website.create({
          knowledgeBaseId: kbId,
          domain,
          pages: [],
          pagesCount: 0
        });
      }

      for (const url of domainUrls) {
        // Check if page already exists
        const pageExists = website.pages.some(p => p.url === url);
        if (!pageExists) {
          website.pages.push({
            url,
            title: '',
            content: '',
            status: 'pending'
          });
        }
      }

      website.pagesCount = website.pages.length;
      await website.save();

      results.push({
        websiteId: website._id,
        domain,
        addedUrls: domainUrls.length
      });
    }

    return {
      added: urls.length,
      failed: 0,
      websites: results
    };
  }

  async deleteWebsite(websiteId: string) {
    const website = await Website.findByIdAndDelete(websiteId);
    if (!website) {
      throw new AppError(404, 'NOT_FOUND', 'Website not found');
    }

    return { message: 'Website deleted successfully' };
  }

  async deleteWebsitePage(websiteId: string, pageId: string) {
    const website = await Website.findById(websiteId);
    if (!website) {
      throw new AppError(404, 'NOT_FOUND', 'Website not found');
    }

    website.pages = website.pages.filter((p: any) => p._id.toString() !== pageId);
    website.pagesCount = website.pages.length;
    await website.save();

    return { message: 'Page deleted successfully' };
  }

  // ===== File Methods =====

  async findAllFiles(kbId: string) {
    const files = await File.find({ knowledgeBaseId: kbId })
      .sort({ uploadedAt: -1 })
      .lean();

    return files;
  }

  async createFileRecord(
    kbId: string,
    filename: string,
    originalFilename: string,
    fileType: string,
    size: number,
    url: string
  ) {
    const file = await File.create({
      knowledgeBaseId: kbId,
      filename,
      originalFilename,
      fileType,
      size,
      url,
      status: 'processing'
    });

    return file;
  }

  async updateFileContent(fileId: string, extractedContent: string, status: string) {
    const file = await File.findByIdAndUpdate(
      fileId,
      { extractedContent, status },
      { new: true }
    );

    return file;
  }

  async deleteFile(fileId: string) {
    const file = await File.findByIdAndDelete(fileId);
    if (!file) {
      throw new AppError(404, 'NOT_FOUND', 'File not found');
    }

    return { file, message: 'File deleted successfully' };
  }
}

export const knowledgeBaseService = new KnowledgeBaseService();

