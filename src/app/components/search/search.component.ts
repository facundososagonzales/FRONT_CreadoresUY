import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userServices } from 'src/app/services/UserServices/userServices';
import { searchProfile } from 'src/app/model/SearchProfile';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  focus;
  focus1;

  searchString:string = '';
  searchProfile:searchProfile[] = [];
  pageSize:number = 10;
  pageNumber:number = 0;
  stopped:boolean = false;


  constructor(private http:userServices, private router:Router, private route:ActivatedRoute) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.searchString = this.route.snapshot.paramMap.get('querry');
    this.getProrfile();
  }

  getProrfile(){
    if(!this.stopped){
      this.http.getCreatorByUserSearch(this.searchString,this.pageNumber.toString(),this.pageSize.toString()).subscribe(res =>{
        if(res['success']){
          if(JSON.stringify(res["obj"]) !== '[]'){
            res['obj'].forEach(element => {
              this.searchProfile.push(element);
            });
          }
          if(res["obj"].length<this.pageSize){
            this.stopped=true;
          }
        }
      });
    }
    this.pageNumber++;
  }

  getProrfileSearch(){
    this.searchProfile=[];
    this.pageNumber=0;
    this.stopped=false;
    this.getProrfile();
  }

  inputText(event:Event){
    this.searchString = (<HTMLInputElement>event.target).value;
  }

  navToSearch(nickname:string){
    console.log(`/creator-Profile/${nickname}`);
    this.router.navigate([`/creator-Profile/${nickname}`]);
  }

  onScroll(){
    this.getProrfile();
  }

}
