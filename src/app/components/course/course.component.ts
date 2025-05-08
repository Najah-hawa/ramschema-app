import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // CommonModule FormsModule och ge stöd för Angulars inbyggda funktioner som ngModel (för tvåvägsbindning).
import { CourseService } from '../../services/course.service'; // hämta data om kurser 
import { Course } from '../../models/course'; // importera interface för att definiera kursobjekten.


@Component({
  selector: 'app-course',  // används för att rendera komponenten i html filen 
  standalone: true,
  imports: [CommonModule, FormsModule], //  Lägg till FormsModule här
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {
  courses: Course[] = [];  //: En array som håller alla kurser vi läst från json filen
  filteredCourses: Course[] = []; // arrayn här sparas efter användarens filterings val. 
  searchTerm: string = '';  //spara sträng som användaren anger i sökfält
  sortColumn: keyof Course = 'code'; // kolumn  som används för att sortera kurserna occh standard är  det code
  sortAsc: boolean = true;  //välja hur sorteringen ska vara antligen stigande (true) eller fallande (false).


  constructor(private courseService: CourseService) {}
//metoder 
  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => { // anropa en funktion för att hämta data 
      this.courses = data; //spara info vi fått i variabeln 
      this.applyFilters(); // Visa listan
    });
  }


  //funktion för att filtrera kurser enligt given text i sökfält.  
  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
  
    this.filteredCourses = this.courses
      .filter(course =>    
        course.code.toLowerCase().includes(term) ||   //kontrollera om kursens code 
        course.coursename.toLowerCase().includes(term)  //eller coursename innehåller den angivna söksträngen.
      )
      .sort((a, b) => this.sortFunction(a, b));  //Efter filtrering sorteras kurserna med hjälp av sortFunction.
  }
  

//skapa en funktion för hantera sorteringen enligt användarens val av kolumn och sorteringsriktning.. 
  private sortFunction(a: Course, b: Course): number {

    //hämtar värderna och spara enligt följande t.ex. om använare  valt att sorrtera via kurskod
    // alltså this.sortColumn är 'code' vi får följande .
    const valA = a[this.sortColumn];   // första alternativ valA = a.code
    const valB = b[this.sortColumn];   // andra alternativ valB = b.code
  
    if (typeof valA === 'string' && typeof valB === 'string') {
      //Använder bokstavsordning för att sortera filtering enligt användarens val och kontrollerar sorteringsriktningen.
      return this.sortAsc
        ? valA.localeCompare(valB)   //stigande=true 
        : valB.localeCompare(valA); //fallande =false
    }
  
    return 0;
  }


// sorta tabellen enligt användarens val på sorteringsriktningen sntligen fallande or stigande 
toggleSortDirection(): void {
  this.sortAsc = !this.sortAsc;
  this.applyFilters();  //updaterar tabellen enligt resulat. 
}

}
