import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { publicService } from "../../services/publicService";
import { Mail, Phone, MapPin, Clock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await publicService.submitContactForm({
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        phone: "+1 (555) 123-4567",
        subject: data.subject,
        message: data.message,
      });
      setSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* 1. Top Hero Section - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-primary font-mono text-xs sm:text-sm tracking-widest uppercase mb-3 block">
            CONTACT US
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* 2. Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT — Contact Information (~45% width: 5 of 12 cols) */}
          <div className="lg:col-span-5 min-w-0 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
              Let's Start a Conversation
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
              Our team is here to help you succeed. Whether you have questions about features, need technical support, or want to discuss custom solutions, we're here to assist.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 mt-0.5">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5">Email</h3>
                  <a href="mailto:support@aurexion.com" className="text-muted-foreground hover:text-primary text-sm transition-colors block">
                    support@aurexion.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 mt-0.5">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5">Phone</h3>
                  <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 mt-0.5">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5">Office</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    123 Innovation Street<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 mt-0.5">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5">Hours</h3>
                  <p className="text-muted-foreground text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground text-sm">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form (~55% width: 7 of 12 cols) */}
          <div className="lg:col-span-7 min-w-0 w-full">
            <div className="bg-card border border-border/40 rounded-xl p-6 sm:p-8 md:p-10 shadow-lg">
              {success ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <CheckCircle2 className="h-16 w-16 text-primary mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold text-foreground mb-3">Message Sent</h3>
                  <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                    Thank you for reaching out. A member of our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)} 
                    className="mt-8 text-primary hover:underline text-sm font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                    Send us a Message
                  </h3>
                  
                  {submitError && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                      <p className="text-sm">{submitError}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Row 1: First Name | Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground">
                          First Name
                        </label>
                        <input 
                          id="firstName" 
                          {...register("firstName")} 
                          className={`w-full h-11 px-3.5 py-2.5 rounded-md bg-background border ${errors.firstName ? 'border-destructive' : 'border-input'} focus:outline-none focus:ring-1 focus:ring-primary text-sm text-foreground transition-colors`} 
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground">
                          Last Name
                        </label>
                        <input 
                          id="lastName" 
                          {...register("lastName")} 
                          className={`w-full h-11 px-3.5 py-2.5 rounded-md bg-background border ${errors.lastName ? 'border-destructive' : 'border-input'} focus:outline-none focus:ring-1 focus:ring-primary text-sm text-foreground transition-colors`} 
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    {/* Row 2: Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                        Email
                      </label>
                      <input 
                        id="email" 
                        type="email"
                        {...register("email")} 
                        className={`w-full h-11 px-3.5 py-2.5 rounded-md bg-background border ${errors.email ? 'border-destructive' : 'border-input'} focus:outline-none focus:ring-1 focus:ring-primary text-sm text-foreground transition-colors`} 
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Row 3: Subject */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground">
                        Subject
                      </label>
                      <input 
                        id="subject" 
                        {...register("subject")} 
                        className={`w-full h-11 px-3.5 py-2.5 rounded-md bg-background border ${errors.subject ? 'border-destructive' : 'border-input'} focus:outline-none focus:ring-1 focus:ring-primary text-sm text-foreground transition-colors`} 
                        placeholder="Inquiry about custom solutions"
                      />
                      {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
                    </div>

                    {/* Row 4: Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
                        Message
                      </label>
                      <textarea 
                        id="message" 
                        rows={5}
                        {...register("message")} 
                        className={`w-full p-3.5 rounded-md bg-background border ${errors.message ? 'border-destructive' : 'border-input'} focus:outline-none focus:ring-1 focus:ring-primary text-sm text-foreground resize-none transition-colors`} 
                        placeholder="Write your message here..."
                      />
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm shadow-sm"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
