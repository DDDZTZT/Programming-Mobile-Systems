import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

//inventory system component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Inventory System';
}