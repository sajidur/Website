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
  techStack = [
    {
      name: '.NET',
      icon: 'code',
      description: 'Robust, scalable web, desktop, and cloud applications built on .NET, backed by years of hands-on enterprise experience.',
    },
    {
      name: 'Python',
      icon: 'code',
      description: 'Data-driven applications and scalable backend services built in Python.',
    },
    {
      name: 'WordPress',
      icon: 'language',
      description: 'Custom themes, plugins, and fully optimized business websites and e-commerce builds.',
    },
    {
      name: 'Shopify',
      icon: 'shopping_cart',
      description: 'Conversion-focused, fully customized online stores with seamless integrations and support.',
    },
    {
      name: 'Android',
      icon: 'android',
      description: 'High-quality, scalable mobile applications for business and consumer use cases.',
    },
    {
      name: 'Node.js',
      icon: 'server',
      description: 'Fast, event-driven backend services and APIs for real-time, high-throughput applications.',
    },
    {
      name: 'Next.js',
      icon: 'layers',
      description: 'Production-grade React applications with server-side rendering and optimized performance.',
    },
    {
      name: 'Nest.js',
      icon: 'layers',
      description: 'Structured, maintainable backend architecture for enterprise-grade Node.js services.',
    },
    {
      name: 'FastAPI',
      icon: 'bolt',
      description: 'High-performance Python APIs with built-in validation and automatic documentation.',
    },
    {
      name: 'Django',
      icon: 'code',
      description: 'Secure, full-featured web applications built rapidly on a batteries-included framework.',
    },
    {
      name: 'Oracle',
      icon: 'database',
      description: 'Enterprise-grade database design, tuning, and integration for mission-critical systems.',
    },
    {
      name: 'SQL Server',
      icon: 'database',
      description: 'Robust data architecture and reporting for business-critical applications.',
    },
    {
      name: 'Cassandra',
      icon: 'database',
      description: 'Highly available, horizontally scalable data storage for large-scale workloads.',
    },
  ];

  currentYear = new Date().getFullYear();

  stats = [
    { value: '8+', label: 'Years in Business' },
    { value: '50+', label: 'Projects Delivered' },
    { value: '20+', label: 'Happy Clients' },
    { value: '15+', label: 'Team Members' },
  ];

  whyChooseUs = [
    {
      title: 'Dedicated Project Team',
      description: 'A focused team assigned to your project from kickoff to launch, so you always know who is accountable for delivery.',
      icon: 'groups',
    },
    {
      title: 'Transparent Communication',
      description: 'Clear timelines, honest pricing, and regular progress updates — no surprises along the way.',
      icon: 'forum',
    },
    {
      title: 'On-Time Delivery',
      description: 'We plan realistically and deliver to schedule, so your business can plan launches with confidence.',
      icon: 'schedule',
    },
    {
      title: 'Post-Launch Support',
      description: 'Our relationship doesn’t end at launch — ongoing maintenance and support keep your systems running smoothly.',
      icon: 'support_agent',
    },
  ];

  faqs = [
    {
      question: 'How long does a typical project take to complete?',
      answer: 'It depends on scope — a focused website or POS integration can take a few weeks, while a full ERP or hospital information system may take a few months. We scope and share a realistic timeline during your free consultation before any work begins.',
      open: false,
    },
    {
      question: 'How does pricing and the free consultation work?',
      answer: 'The consultation is a no-obligation call to understand your requirements. From there, we provide a clear, itemized quote based on scope — no hidden costs. For ongoing website care, our maintenance packages are priced monthly (see Maintenance Packages above).',
      open: false,
    },
    {
      question: 'Do you provide support after the project launches?',
      answer: 'Yes. Every engagement includes a post-launch support window, and we offer ongoing maintenance packages for continued monitoring, updates, and bug fixes after that.',
      open: false,
    },
    {
      question: 'What technologies do you work with?',
      answer: 'Our core stack covers .NET, Python, WordPress, Shopify, and Android — see the Tech Stack section above. If your project needs something outside that list, tell us during the consultation and we\'ll let you know if it\'s a fit.',
      open: false,
    },
    {
      question: 'Can you maintain or upgrade an existing website or system?',
      answer: 'Yes — we regularly take over existing codebases for maintenance, feature additions, and upgrades, not just greenfield builds.',
      open: false,
    },
  ];

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
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

  maintenancePackages = [
    {
      id: 'package1',
      name: 'Standard Plan',
      price: 1500,
      period: '/month',
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
      highlighted: false
    },
    {
      id: 'package2',
      name: 'Premium Plan',
      price: 2000,
      period: '/month',
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
      highlighted: true
    }
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
      name: 'Fair Pattern',
      link: 'https://www.fairpattern.com/',
      image: 'assets/images/clients/fairpattern.png'
    },
    {
      name: 'Opsio Cloud',
      link: 'https://opsiocloud.com/',
      image: 'assets/images/clients/opsio.png'
    },
    {
      name: 'AFS Energy',
      link: 'https://afsenergy.ae/',
      image: 'assets/images/clients/afs.png'
    },
    {
      name: 'Metlinx LLC',
      link: 'https://metlinx.com/',
      image: 'assets/images/clients/metlinx.png'
    },
    {
      name: 'Home Expro Solutions',
      link: 'https://www.homexprosolutions.com/',
      image: 'assets/images/clients/homeexpro.png'
    },
    {
      name: 'Look space Solutions',
      link: 'https://lookspaces.com/',
      image: 'assets/images/clients/lookspace.png'
    },
    {
      name: 'Lakeland Home Management LLC',
      link: 'https://lakelandhomemgt.com/',
      image: 'assets/images/clients/lakeland.png'
    },
    {
      name: 'CCDB',
      link: 'https://ccdbbd.org/',
      image: 'assets/images/clients/ccdb.png'
    },
    {
      name: 'tlce',
      link: 'https://www.tlece.com/',
      image: 'assets/images/clients/tlece.png'
    },
    {
      name: 'inteamhealth',
      link: 'https://www.inteamhealth.com/',
      image: 'assets/images/clients/inteamhealth.png'
    },
    {
      name: 'bonik',
      link: 'https://www.bonik.online/',
      image: 'assets/images/clients/bonik.png'
    },
    {
      name: 'Grameen Distribution',
      link: 'https://grameendistribution.com/',
      image: 'assets/images/clients/gdl-logo.png'
    }
  ];
  groupedClients: any[] = [];

  imageLink: any;
  public emailObj = {
    name: "",
    toEmail: "",
    phoneNumber: "",
    company: "",
    subject: "",
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
    const scrollHere = document.getElementById(id);
    if (!scrollHere) {
      return;
    }
    scrollHere.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
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

    const requestData = {
      name: this.emailObj.name,
      email: this.emailObj.toEmail,
      phoneNumber: this.emailObj.phoneNumber,
      company: this.emailObj.company,
      subject: this.emailObj.subject,
      body: this.emailObj.message,
    };

    this.contactusService.sendEmail(requestData).subscribe({
      next: (result) => {
        this.spinner.hide()
        console.log("postEmailRes", result);
        Swal.fire({
          icon: 'success',
          title: 'Message sent successfully',
          timer: 3000,
        });
        this.emailObj = {
          name: "",
          toEmail: "",
          phoneNumber: "",
          company: "",
          subject: "",
          message: ""
        };
      },
      error: (err) => {
        this.spinner.hide()
        console.log("postEmailErr", err);
        // We might want to keep the data if it errored, but the original code cleared it partially.
        // Let's keep the form data for easier retry if it fails, or clear if the user prefers.
        // Original code cleared it.
        this.emailObj = {
          name: "",
          toEmail: "",
          phoneNumber: "",
          company: "",
          subject: "",
          message: ""
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
