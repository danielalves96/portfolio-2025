import { BaseEntity } from '@/shared/types';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormSubmission extends BaseEntity {
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'sent' | 'failed';
}

export class ContactForm {
  constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly message: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name.trim()) {
      throw new Error('Name is required');
    }
    if (!this.isValidEmail(this.email)) {
      throw new Error('Invalid email address');
    }
    if (!this.message.trim()) {
      throw new Error('Message is required');
    }
    if (this.message.length < 10) {
      throw new Error('Message must be at least 10 characters long');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toSubmission(): ContactFormSubmission {
    return {
      id: crypto.randomUUID(),
      name: this.name,
      email: this.email,
      message: this.message,
      timestamp: new Date(),
      status: 'pending',
      createdAt: new Date(),
    };
  }

  toDTO(): ContactFormData {
    return {
      name: this.name,
      email: this.email,
      message: this.message,
    };
  }
}
