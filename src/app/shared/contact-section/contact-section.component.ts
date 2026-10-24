import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactusService } from 'src/app/shared/services/contactus.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CONTACT_INTERESTS } from '../data/site-content';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit {
  @Input() interest = '';

  interests = CONTACT_INTERESTS;

  emailObj = {
    name: '',
    toEmail: '',
    phoneNumber: '',
    company: '',
    interest: '',
    message: ''
  };

  constructor(private contactusService: ContactusService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.emailObj.interest = this.interest;
  }

  submitInfo(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.spinner.show();
    const requestData = {
      name: this.emailObj.name,
      email: this.emailObj.toEmail,
      phoneNumber: this.emailObj.phoneNumber,
      company: this.emailObj.company,
      subject: this.emailObj.interest ? `Inquiry: ${this.emailObj.interest}` : 'Website inquiry',
      body: this.emailObj.message,
    };

    this.contactusService.sendEmail(requestData).subscribe({
      next: () => {
        this.spinner.hide();
        Swal.fire({ icon: 'success', title: 'Message sent successfully', timer: 3000 });
        this.resetForm();
        form.resetForm({ interest: this.interest });
      },
      error: () => {
        this.spinner.hide();
        this.resetForm();
      },
    });
  }

  private resetForm(): void {
    this.emailObj = {
      name: '',
      toEmail: '',
      phoneNumber: '',
      company: '',
      interest: this.interest,
      message: ''
    };
  }
}
