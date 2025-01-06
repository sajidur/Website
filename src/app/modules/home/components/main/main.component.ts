import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from "jquery";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ContactusService } from 'src/app/shared/services/contactus.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import * as AOS from 'aos';

@Component({
  selector: 'home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  developers = [
    { name: '.Net Developers', image: 'assets/images/stuff/img1.jpeg' },
    { name: 'Python Developers', image: 'assets/images/stuff/img2.jpeg' },
    { name: 'Wordpress Developers', image: 'assets/images/stuff/img3.jpeg' },
    { name: 'Shopify Developers', image: 'assets/images/stuff/img4.jpeg' },
    { name: 'Android Developers', image: 'assets/images/stuff/img5.jpeg' },
  ];

  developerGroups = this.groupDevelopers(this.developers, 3);

  //   /**
  //  * Groups developers into chunks for the carousel.
  //  * @param developers Array of developers.
  //  * @param chunkSize Number of items per carousel slide.
  //  * @returns Array of grouped developers.
  //  */
  private groupDevelopers(developers: any[], chunkSize: number): any[][] {
    const groups = [];
    for (let i = 0; i < developers.length; i += chunkSize) {
      groups.push(developers.slice(i, i + chunkSize));
    }
    return groups;
  }


  services = [
    {
      title: 'Point of Sales',
      description: 'Get expert developers to bring your ideas to life. From building new apps to enhancing existing systems, we provide the talent you need to achieve your goals. Let’s create something amazing together!',
      image: 'assets/images/services-img/Unbox.png',
    },
    {
      title: 'Any Scale E-commerce Solutions',
      description: 'From startups to enterprise-level e-commerce platforms, we develop scalable, high-performance online stores with custom features, intuitive designs, and secure payment integrations.',
      image: 'assets/images/services-img/money, document, agreement.png',
    },
    {
      title: 'Data Visualization Tools',
      description: 'Turn complex data into actionable insights with our custom data visualization tools. We create intuitive dashboards and reports that help you make informed decisions faster.',
      image: 'assets/images/services-img/Pie chart.png',
    },
    {
      title: 'Inventory & Accounting Solutions',
      description: 'Simplify your business processes with our integrated inventory and accounting systems, ensuring efficient stock management, real-time tracking, and accurate financial reporting.',
      image: 'assets/images/services-img/Scroll-up.png',
    },
    {
      title: 'Online Recruitment Systems',
      description: 'Revolutionize your hiring process with our online recruitment systems that provide automated applicant tracking, resume parsing, and seamless candidate management.',
      image: 'assets/images/services-img/Community.png',
    },
    {
      title: 'ERP Solutions',
      description: 'Boost productivity and streamline your operations with our end-to-end ERP solutions. We build systems tailored to your business needs, covering everything from finance to supply chain management.',
      image: 'assets/images/services-img/web cloud.png',
    },
    {
      title: 'Hospital Information Systems',
      description: 'Streamline healthcare operations with our robust Hospital Information Systems, designed for patient management, appointment scheduling, billing, and medical records.',
      image: 'assets/images/services-img/users, traffic, web.png',
    },
    {
      title: 'Management Information System',
      description: 'Our  expertise in MIS solutions provide real-time insights into key operational metrics, helping you manage resources effectively and enhance productivity',
      image: 'assets/images/services-img/config, settings, web app.png',
    },
    
  ];
  





  clients = [
    {
      name: 'BDDOT',
      link: 'https://bddot.com/',
      image: 'assets/images/clients/bddots.png'
    },
    // {
    //   name: 'Tlece',
    //   link: 'https://www.tlece.com/',
    //   image: 'assets/images/clients/tlece.png'
    // },
    {
      name: 'Dhaka Handicrafts Limited.',
      link: 'https://dhakahandicrafts.com/',
      image: 'assets/images/clients/dhaka_handicraft_logo.png'
    },
    {
      name: 'Chittagong University Public Administration Ex-Student Forum, Dhaka',
      link: 'https://cupaesfd.org/',
      image: 'assets/images/clients/cupaLogo.png'
    },
    {
      name: 'Excellence Shoes',
      link: '',
      image: 'assets/images/clients/excellenceshoe.png'
    },
    {
      name: 'Exness',
      link: '',
      image: 'assets/images/clients/exness.png'
    },
    {
      name: 'ROI',
      link: '',
      image: 'assets/images/clients/roi.png'
    },
    {
      name: 'Sagecity',
      link: '',
      image: 'assets/images/clients/sagecity.png'
    },
    {
      name: 'CCDB',
      link: 'https://ccdbbd.org/',
      image: 'assets/images/clients/ccdb.png'
    }
  ];
  groupedClients: any[] = [];

  imageLink: any;
  public emailObj = {
    name: "",
    toEmail: "",
    message: ""
  };
  

  constructor(private contactusService: ContactusService, private spinner: NgxSpinnerService) {
    // this.dataSource.paginator = this.paginator
  }


  ngOnInit(): void {
    // $(document).ready(function () {
    //   $('#dtBasicExample').DataTable();
    //   $('.dataTables_length').addClass('bs-select');
    // });
    AOS.init({
      duration: 2000, // Animation duration in milliseconds
    });

    this.groupedClients = this.chunkArray(this.clients, 3);
  }

  chunkArray(arr: any[], chunkSize: number): any[] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
  ngAfterViewInit() {

  }


  updateSelectedDom($event: any) {
    $(".tab-link")
      .removeClass("button-selected")
      .addClass("button-deselected");
    $($event.target.classList.add("button-selected"));
  }

  gotToRedirect(id: any) {
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
      top: rect,
      behavior: 'smooth'
    })
  }


  imageViewer(imgLink: any) {
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

  submitInfo() {
    console.log('edata', this.emailObj)
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
          message: "",
          name: ""
        };
      },
      error: (err) => {
        this.spinner.hide()
        console.log("postEmailErr", err);
        this.emailObj = {
          toEmail: "",
          message: "",
          name: ""
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
