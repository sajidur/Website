import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from 'src/app/shared/services/contactus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  @ViewChild('contactFormSection') contactFormSection!: ElementRef;

  contactForm: FormGroup;
  selectedPackage: string = '';
  isLoading: boolean = false;
  serverError: string = '';

  packages = [
    {
      id: 'package1',
      name: 'Standard Plan',
      price: 5000,
      period: '/year',
      currency: 'BDT',
      description: 'Perfect for small websites',
      services: [
        'Regular Backup Management (Daily/Weekly)',
        'Backup Restoration Support (on demand)',
        'Server Log Monitoring & Cleaning',
        'Scheduled Server Restart & Health Check',
        'Uptime Monitoring & Basic Alerting',
        'Security Patch Updates (OS & Server Software)',
        'Website/Application Availability Check',
        'Disk Space Monitoring & Optimization',
        'Basic Performance Monitoring (CPU, RAM, Disk)',
        'Database Health Check & Basic Optimization',
        'Email/Notification Service Check (if applicable)',
        'Error Log Review & Basic Issue Fixing'
      ],
      support: [
        'Remote Support (Business Hours)',
        'Response Time: Within 24 Hours'
      ],
      exclusions: [
        'Major Server Configuration Changes',
        'New Feature Development',
        'Application Code Changes',
        'Infrastructure Migration / Scaling',
        'Third-party Service Cost'
      ],
      highlighted: false
    },
    {
      id: 'package2',
      name: 'Premium Plan',
      price: 10000,
      period: '/year',
      currency: 'BDT',
      description: 'Best for growing websites',
      services: [
        'Regular Backup Management (Daily/Weekly)',
        'Backup Restoration Support (on demand)',
        'Server Log Monitoring & Cleaning',
        'Scheduled Server Restart & Health Check',
        'Uptime Monitoring & Basic Alerting',
        'Security Patch Updates (OS & Server Software)',
        'Website/Application Availability Check',
        'Disk Space Monitoring & Optimization',
        'Basic Performance Monitoring (CPU, RAM, Disk)',
        'SSL Certificate Monitoring & Renewal Reminder',
        'Database Health Check & Basic Optimization',
        'Email/Notification Service Check (if applicable)',
        'Error Log Review & Basic Issue Fixing',
        'Monthly Maintenance Report'
      ],
      support: [
        'Remote Support (Business Hours)',
        'Response Time: Within 24 Hours',
        'Emergency Support (Critical Downtime): Priority Handling',
        'Infrastructure Migration'
      ],
      exclusions: [
        'Major Server Configuration Changes',
        'New Feature Development',
        'Application Code Changes',
        'Third-party Service Cost'
      ],
      highlighted: true
    }
  ];

  constructor(
    private fb: FormBuilder,
    private contactusService: ContactusService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      company: ['', [Validators.required]],
      website: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  selectPackage(packageId: string): void {
    this.selectedPackage = packageId;
    setTimeout(() => {
      this.contactFormSection?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  submitForm(): void {
    if (this.contactForm.invalid || !this.selectedPackage) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill all required fields and select a package.',
        confirmButtonColor: '#667eea'
      });
      return;
    }

    this.isLoading = true;
    this.serverError = '';

    const selectedPkg = this.packages.find(p => p.id === this.selectedPackage);
    const messageBody = `I am interested in the ${selectedPkg?.name} (BDT ${selectedPkg?.price}/year). ${this.contactForm.value.message || ''}`;
    
    const emailBody = {
      Name: this.contactForm.value.name,
      PhoneNumber: this.contactForm.value.phone,
      Email: this.contactForm.value.email,
      Company: this.contactForm.value.company,
      Website: this.contactForm.value.website,
      Body: messageBody,
      Subject: `Maintenance Package Inquiry - ${selectedPkg?.name}`,
      EmailType: 'MaintenancePackageInquiry'
    };

    this.contactusService.sendEmail(emailBody).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your inquiry has been sent successfully. We will contact you soon.',
          confirmButtonColor: '#667eea'
        }).then(() => {
          this.contactForm.reset();
          this.selectedPackage = '';
          this.serverError = '';
        });
      },
      (error: any) => {
        this.isLoading = false;
        let errorMessage = 'Failed to send your inquiry. Please try again.';
        
        if (error?.error?.errors) {
          const errorKeys = Object.keys(error.error.errors);
          errorMessage = errorKeys.map(key => error.error.errors[key].join(', ')).join('\n');
          this.serverError = errorMessage;
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorMessage,
          confirmButtonColor: '#667eea'
        });
        console.error('Error:', error);
      }
    );
  }

  getSelectedPackageName(): string {
    const pkg = this.packages.find(p => p.id === this.selectedPackage);
    return pkg ? pkg.name : 'No Package Selected';
  }

}
