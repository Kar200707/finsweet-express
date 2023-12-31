import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {Category} from "../../../models/category";
import {RequestService} from "../../../services/request.service";
import {environment} from "../../../../environment/environment";
import {NgIf} from "@angular/common";
import {DialogCategoryComponent} from "../dialog_components/dialog-category/dialog-category.component";
import {DialoginputValueService} from "../../../services/dialoginput-value.service";
import {Authors} from "../../../models/authors";

@Component({
  selector: 'app-category-adm',
  templateUrl: './category-adm.component.html',
  styleUrls: ['./category-adm.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    NgIf
  ]
})
export class CategoryAdmComponent implements OnInit{
  dataCategory!: Category[];
  userData: Authors = JSON.parse(localStorage.getItem('userData') ?? 'null').user;

  displayedColumns: string[] = [
    'category',
    'image',
    'description',
    'shortDescription',
    'action'
  ];

  constructor(
    private reqServ: RequestService,
    private dialog: MatDialog,
    private dialogDetails: DialoginputValueService
  ) {  }

  ngOnInit():void {
    this.getPosts();
  }

  getPosts():void {
    this.reqServ.getData<Category[]>(environment.category.get)
      .subscribe((data: Category[]):void =>{
        this.dataCategory = data;
      })
  }

  deletePost(id: string):void {
    if (confirm('delete this category ?')) {
      this.reqServ.deleteData(environment.category.get + '/' + id)
        .subscribe(():void => {})
      this.getPosts();
    }
  }

  openEditDialog (id: any):void {
    let isOpened: boolean = true;

    this.dialog.open(DialogCategoryComponent, {
      width: '520px',
    })

    this.dialog.afterAllClosed.subscribe(() => {
      if (isOpened) {
        this.getPosts();
        isOpened = false;
      }
    })

    this.dialogDetails.idCatgory = id;
    this.dialogDetails.isCalledCategory = 'categoryEdit'
  }

  openAddDialog ():void {
    let isOpened: boolean = true;

    this.dialog.open(DialogCategoryComponent, {
      width: '520px',
    })

    this.dialog.afterAllClosed.subscribe(() => {
      if (isOpened) {
        this.getPosts();
        isOpened = false;
      }
    })

    this.dialogDetails.isCalledCategory = 'categoryAdd'
  }
}
