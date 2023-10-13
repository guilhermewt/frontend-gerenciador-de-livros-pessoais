import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/component/user/user-models/user.model';
import { ExceptionsService } from 'src/app/component/exception/exception-services/exceptions.service';
import { UserDomainService } from 'src/app/component/user/user-services/user-domain.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{

  user:user = {
    name:'',
    username:'',
    password:'',
    email:''
  }

  confirmPassword:string = ''

  myForm: FormGroup;

  submitted = false;
  

  constructor(private userdomainService:UserDomainService,private router:Router,private exception:ExceptionsService,private formBuilder: FormBuilder){
    this.myForm = this.formBuilder.group({
      name:['',[Validators.required]],
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]]
      
      // Adicione outros campos e validações conforme necessário
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.myForm.valid) {
      this.user.name = this.myForm.value.name;
      this.user.username = this.myForm.value.login;
      this.user.email = this.myForm.value.email;
      this.user.password = this.myForm.value.password;

      this.createUser();
    } else {
     this.submitted = true
     this.exception.showMensage('Preencha todos os campos','','toast-error')
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.myForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }
  
  
  createUser():void{
      this.userdomainService.createUserService(this.user).subscribe(
        (data) => {   
          this.exception.showMensage('operação bem sucedida','usuario cadastrado','toast-sucess'),
          this.router.navigate(['/login'])
        });
  }

  cancel(){
    this.router.navigate(['/login'])
  }

  public confirmPasswordMethod():boolean{
    if(this.user.password != this.confirmPassword){
      return false
    }
    return true
  }

}
