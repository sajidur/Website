import { Component, OnInit, ViewChild  } from '@angular/core';
import * as $ from "jquery";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ContactusService } from 'src/app/shared/services/contactus.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  imageLink: any;
  public emailObj = {
	  toEmail: "",
    subject: "",
    body: "",
    phone:"",
    name:""
	};

  constructor(private contactusService: ContactusService,private spinner: NgxSpinnerService) { 
    // this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    // $(document).ready(function () {
    //   $('#dtBasicExample').DataTable();
    //   $('.dataTables_length').addClass('bs-select');
      // });
  }
  ngAfterViewInit() {

  }

 
  updateSelectedDom($event:any) {
    $(".tab-link")
      .removeClass("button-selected")
      .addClass("button-deselected");
    $($event.target.classList.add("button-selected"));
  }

  gotToRedirect(id:any) {
    // $('html,body').animate(
    //   {
    //     scrollTop: $('#ContactUsLink').offset().top
    //   },
    //   'slow'
    // );
    let scrollHere: any;
		scrollHere = document.getElementById(id);
		let rect = scrollHere.getBoundingClientRect().top;
		window.scrollTo({
      top:rect,
      behavior:'smooth'
    })
  }

  
  imageViewer(imgLink:any) {
    this.imageLink = imgLink;
    const imgModal = document.getElementById('imageViewModal');
    // const mainContianerId = document.getElementById('main-container-id')
    // $('#mainContianerId').hide();
    $('.popUpImageModal').css('height', window.innerHeight);
    if (imgModal) {
      $('#imageViewModal').show(500);
      // $('.headerTopLeft').css('z-index', '1');
    }
  }

  closeImage() {
      this.imageLink = null;
      const modal = document.getElementById('imageViewModal');
      // const mainContianerId = document.getElementById('main-container-id')
      // $('#mainContianerId').show();
      if (modal) {
        // $('.headerTopLeft').css('z-index', '1000');
        modal.style.display = 'none';
        // sideTab.style.display = 'block';
      }
  }

  submitInfo(){
    console.log('edata',this.emailObj)
    this.spinner.show()
    this.contactusService.sendEmail(this.emailObj).subscribe({
      next: (result) => {
        this.spinner.hide()
        console.log("postEmailRes", result); 
        Swal.fire({
          icon: 'success',
					title: 'Message sent successfully',
					timer: 3000,
				});
        this.emailObj = {
          toEmail: "",
          subject: "",
          body: "",
          phone:"",
          name:""
        };
      },
      error: (err) => {
        this.spinner.hide()
        console.log("postEmailErr", err);
        this.emailObj = {
          toEmail: "",
          subject: "",
          body: "",
          phone:"",
          name:""
        };
      },
    });


    //   const send_sms_url = 'http://mokles-001-site5.itempurl.com/Email';
		// 	const receiver_email = 'ashraful.ru37@gmail.com';
		// 	const mail_subject = 'Test Subject'
		// 	const htmlBody =
		// 		'<div style="border: 2px solid green;border-radius: 10px; padding: 1%;">'
		// 		+ '<p style="font-size: 1.7vw; font-weight: bold;text-decoration: underline;">' + mail_subject + ' </p>'
		// 		+ '<p *ngIf="!this.contactModel.subject" style="font-size: 1.4vw;"><b style="margin-right:2%">Subject:</b>' + 'sampletest' + ' </p>'
		// 		+ '<p style="font-size: 1.4vw;"><b style="margin-right:2%">Email Address:</b>' + 'sampletest' + ' </p>'
		// 		+ '<p *ngIf="!this.contactModel.message" style="font-size: 1.4vw;"><b style="margin-right:2%">Message:</b>' + 'sampletest' + ' </p>'
		// 		+ '</div>';


    //   let rbody = {
    //     toEmail: "ashraful.ru37@gmail.com",
    //     subject: "Test S",
    //     body: htmlBody,
    //     phone:"01719304970",
    //     name:"ashraf" 
    // }
		// 	$.post(send_sms_url, rbody, function (data, status) {
		// 		console.log('License Sent success:', status)

		// 	});

  }

}
