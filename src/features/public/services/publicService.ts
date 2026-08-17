import axiosClient from "../../../api/axiosClient";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { BlogPost, CaseStudy, Industry, Job, JobApplication, Service, ContactFormData, QuoteFormData } from "../types/website.types";

export const publicService = {
  // CMS endpoints
  getServiceBySlug: async (slug: string): Promise<Service> => {
    const response = await axiosClient.get(API_ENDPOINTS.CMS.PUBLIC_SERVICE_DETAIL(slug));
    return response as any;
  },

  getIndustryBySlug: async (slug: string): Promise<Industry> => {
    const response = await axiosClient.get(API_ENDPOINTS.CMS.PUBLIC_INDUSTRY_DETAIL(slug));
    return response as any;
  },

  getCaseStudies: async (): Promise<CaseStudy[]> => {
    const response = await axiosClient.get(API_ENDPOINTS.CMS.PUBLIC_CASE_STUDIES);
    return (response as any) || [];
  },

  getBlogPosts: async (): Promise<BlogPost[]> => {
    const response = await axiosClient.get(API_ENDPOINTS.CMS.PUBLIC_BLOG);
    return (response as any) || [];
  },

  // Careers endpoints
  getJobs: async (): Promise<Job[]> => {
    const response = await axiosClient.get(API_ENDPOINTS.RECRUITMENT.PUBLIC_JOBS);
    const data = response as any;
    return Array.isArray(data) ? data : (data?.results || []);
  },

  getJobById: async (jobId: string): Promise<Job> => {
    const response = await axiosClient.get(API_ENDPOINTS.RECRUITMENT.PUBLIC_JOB_DETAIL(jobId));
    return response as any;
  },

  applyForJob: async (data: JobApplication): Promise<void> => {
    const formData = new FormData();
    // Backend ApplySerializer expects: job_id, first_name, last_name, email, phone, resume
    formData.append("job_id", data.jobId);
    const nameParts = data.name.trim().split(" ");
    const firstName = nameParts[0] || data.name;
    const lastName = nameParts.slice(1).join(" ") || "-";
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.coverLetter) formData.append("coverLetter", data.coverLetter);
    if (data.resume) formData.append("resume", data.resume);

    await axiosClient.post(API_ENDPOINTS.RECRUITMENT.PUBLIC_APPLY, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // These are placeholders for missing APIs as reported in the plan
  submitContactForm: async (data: ContactFormData): Promise<void> => {
    // throw new Error("Contact API is missing");
    console.warn("Mock contact form submission:", data);
    return Promise.resolve();
  },

  requestQuote: async (data: QuoteFormData): Promise<void> => {
    // throw new Error("Request Quote API is missing");
    console.warn("Mock quote request submission:", data);
    return Promise.resolve();
  },
  
  submitRfp: async (data: any): Promise<void> => {
    // throw new Error("RFP API is missing");
    console.warn("Mock RFP submission:", data);
    return Promise.resolve();
  },
  
  calculateEstimate: async (data: any): Promise<any> => {
    // throw new Error("Estimator API is missing");
    console.warn("Mock estimate calculation:", data);
    return Promise.resolve({ estimatedCost: "$10,000" });
  }
};

export default publicService;
