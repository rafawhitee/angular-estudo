import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  dataSource: MatTableDataSource<any>;
  pessoas:any = []
  displayedColumns = ['id', 'nome', 'login', 'altura', 'peso']; 
  
  ngOnInit() {

  }

  constructor(public dialog: MatDialog, public api: ApiService) {

  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   buscarPessoas(){
    this.pessoas = this.api.getPessoas().subscribe(data => {
       this.pessoas = data;
       this.dataSource = new MatTableDataSource(this.pessoas);
       this.dataSource.paginator = this.paginator
       this.dataSource.sort = this.sort
    }, err => {console.log(err)})
  }

  abrirPopupNovaPessoa() : void {
    const dialogRef = this.dialog.open(FormPessoaDialog, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  

}




/* dialog */

@Component({
  selector: 'form-pessoa-dialog',
  templateUrl: 'form-pessoa-dialog.html',
})
export class FormPessoaDialog {

  formCadastroOrInserir;

  @Input() id: any;
  @Input() nome: string;



  constructor(public api: ApiService, private fb: FormBuilder, public dialogRef: MatDialogRef<FormPessoaDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formCadastroOrInserir = this.fb.group({
      nome:[''],
      login:[''],
      senha:[''],
      altura:[''],
      peso:['']
    })
  }

  atualizarOuInserir(){
    let pessoa = {nome: this.formCadastroOrInserir.controls['nome'].value, 
                  login: this.formCadastroOrInserir.controls['login'].value, 
                  senha: this.formCadastroOrInserir.controls['senha'].value,
                  altura: this.formCadastroOrInserir.controls['altura'].value,
                  peso: this.formCadastroOrInserir.controls['peso'].value,
                  }
    this.api.inserirPessoa(pessoa).subscribe( success => {
         console.log('Inseriu' + success)
         this.dialogRef.close();
    }, err => {
      console.log('Error' + err)
      this.dialogRef.close();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
