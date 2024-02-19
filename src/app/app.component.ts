import { Component} from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { APIServiceService } from './apiservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) 


export class AppComponent {
  title = 'Csureinfotech3';
  public getJsonValue:any;
  public postJsonValue:any;
  public ReviewList:any; // API Reviws Data Varible
  public PortfolioList:any; // API Portfolio Data Varible
  Isshow: boolean = true;


  constructor(private http:HttpClient) 
  {
    console.log ("Reviws API Call...");

    var response = this.http.get('https://localhost:7129/api/Data/Reviews').subscribe((data) =>   // Link ne update karvani
    {
      debugger
      console.log("Reviws API call compeleted" + data);   
     
      this.ReviewList = data; // API Reviws Data Send -> Website
      console.log(this.ReviewList ); // API Reviws Data Send -> Website
      // this.Isshow = true;
      console.log("https://localhost:7129/api/Data/Reviews Reviws api call completed : " + data);

    });       

    console.log("PortfolioModel API Call...");

    var var_name =this.http.get('https://localhost:7129/api/DataPortfolio/Portfolio').subscribe((data)=> // Link ne update karvani
    {

      console.log("Reviws API call compeleted" + data);  

      this.PortfolioList = data; // API Portfolio Data Send -> Website
      console.log(this.PortfolioList ); // API Portfolio Data Send -> Website

      console.log("https://localhost:7129/api/DataPortfolio/Portfolio Portfolio api call completed : " + data);

    });
    
  }

  APIFUN(){
    this.postmethod();
  }

  public postmethod()
  {
    let body = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    this.http.post('https://jsonplaceholder.typicode.com/posts',body).subscribe((data) =>{
        console.log(data);
        this.postJsonValue = data;
      }
    );
  }

  submitted = false;
  name = "";
  color = "";
  email = "";
  subject = "";
  message = "";
  nameErrorMsg = "";
  emailErrorMsg = "";
  subjectErrorMsg = "";
  messageErrorMsg = "";
  body: any;
  snippet: any;

  ReadMore:boolean = true;
  visible:boolean = false;

  isEmailSet(){
    this.ReadMore = !this.ReadMore; 
    this.visible = !this.visible
  }

  onClick(name: string , email: string, subject: string, message: string)
  {
    /*if(name == "" || name == null)
    {
      this.nameErrorMsg = "Please enter your name";
    }
    else
    {
      this.nameErrorMsg = " ";
    }*/
    if(email == "null" || email == "" || email == "[a-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
    {
      this.emailErrorMsg = "Please enter your email";
    }
    else 
    {
      this.emailErrorMsg = "";
    }
    if(subject == "" || subject == null)
    {
      this.subjectErrorMsg = "Please enter your subject";
    }
    else
    {
      this.subjectErrorMsg = "";
    }

    if(message == "" || message == null)
    {
      this.messageErrorMsg = "Please enter your message";
    }
    else
    {
      this.messageErrorMsg = "";
    }

    //  API call code   //
    console.log("Call To API");
    
    if(name == "" || email == "" || subject == "" || message == "")
    {
      console.log ("Invalid " + name);

      this.ReadMore = !this.ReadMore; 
      this.visible = !this.visible;

      //Name Validation;
      var pattern = new RegExp("^[a-zA-Z ]{1,}$");

      if(name == "")
      {
        //console.log("NotSuccessfully");
        this.nameErrorMsg = "Please enter your name";
      }
      else if(!pattern.test(name))
      {
        //console.log("Successfully Name");
        this.nameErrorMsg = "";  // Please enter proper name
      }
      else
      {
        this.nameErrorMsg = "";
      }
      
       /*//Email Validation;
      var pattern = new RegExp("([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)");

      console.log("Value : "+ pattern);

     if(email == "")
      {
        //debugger
        // console.log("NotSuccessfully");
        this.emailErrorMsg = "Please enter your email";
        // this.emailErrorMsg.classList.remove('myClass'); 
      }
      else if(!pattern.test(email))
      {
        this.emailErrorMsg = "Please enter proper email"; 
        // console.log("Successfully Email Address");
        // this.emailErrorMsg = "Please enter proper email";
      }
      else
      {
        this.emailErrorMsg = "";
      }*/

    }
    else
    {
      console.log ("Valid Successsfully...");

      let body = { Name: name, Subject: subject, Email: email, Message: message }; // passs
    
        var response = this.http.post('https://localhost:7129/Mail/SendMail',body).subscribe((data) =>
        {
          console.log("API call compeleted" + data);      

          this.postJsonValue = data;
          this.ReadMore = !this.ReadMore; 

          setTimeout(() =>
          {
            //console.log("SetTimeout Function Executed...");
            this.visible = false;
          },10000);     
          //console.log("setTimeout() example...");
          
          console.log("https://localhost:7129/Mail/SendMail api call completed : " + data);
    
          //this.ReadMore = !this.ReadMore; 
          //this.visible = !this.visible;
        }        

      );   
    }

  }

  // Validation NameClickEvent //
  NameClickEvent(name: string)
  {
    //console.log("name :" + name);
    //pc code start
    var pattern = new RegExp("^[a-zA-Z ]{1,}$");

    if(name == "")
    {
      //console.log("NotSuccessfully");
      this.nameErrorMsg = "Please enter your name";
    }
    else if(!pattern.test(name))
    {
      //console.log("Successfully Name");
      this.nameErrorMsg = "Please enter proper name";  
    }
    else{
      this.nameErrorMsg = "";
    }
  }

  // Validation EmailClickEvent //
  EmailClickEvent(email: string)
  {
    var pattern = new RegExp("([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)");
    if(email == "")
      {
        // console.log("NotSuccessfully");
        this.emailErrorMsg = "Please enter your email";
        // this.emailErrorMsg.classList.remove('myClass'); 
      }
      else if(!pattern.test(email))
      {
        this.emailErrorMsg = "Please enter proper email"; 
        // console.log("Successfully Email Address");
        // this.emailErrorMsg = "Please enter proper email";
      }
      else
      {
        this.emailErrorMsg = "";
      }
    
  }

  // Validation SubjectClickEvent //
  SubjectClickEvent(subject: string)
  {
    //console.log("subject :"  + subject);

    var pattern = new RegExp("^[a-zA-Z]+''{1,20}$");
    
    if(subject == "")
    {
      this.subjectErrorMsg= "Please enter your subject";
    }
    else if(!pattern.test(subject))
    {
      this.subjectErrorMsg = "";
    }
    else{
      this.subjectErrorMsg = "";
    }
  }

  // Validation MessageClickEvent //
  MessageClickEvent(message: string)
  {
    console.log("message :"  + message);

    var pattern = new RegExp("^[a-zA-Z ]{1,50}$");
    if(message == "")
    {
      this.messageErrorMsg = "Please enter your message";
    }
    else if(!pattern.test(message))
    {
      this.messageErrorMsg = ""; // Please enter your message
    }
    else{
      this.messageErrorMsg = "";
    }
  }

}


