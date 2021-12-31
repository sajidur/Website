import { Component, OnInit, ViewChild  } from '@angular/core';
import * as $ from "jquery";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';





@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  imageLink: any;

  constructor(private router: Router) { 
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
    const mainContianerId = document.getElementById('main-container-id')
    $('#mainContianerId').hide();
    $('.popUpImageModal').css('height', window.innerHeight);
    if (imgModal) {
      $('#imageViewModal').show(500);
      // $('.headerTopLeft').css('z-index', '1');
    }
  }

  closeImage() {
      this.imageLink = null;
      const modal = document.getElementById('imageViewModal');
      const mainContianerId = document.getElementById('main-container-id')
      $('#mainContianerId').show();
      if (modal) {
        // $('.headerTopLeft').css('z-index', '1000');
        modal.style.display = 'none';
        // sideTab.style.display = 'block';
      }
  }

}
