import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UikAmModule} from '@visiativ/uik-am';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UikAmModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'my-app';
}
