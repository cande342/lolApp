import { Component } from '@angular/core';
import { BottomFormComponent } from "../../components/bottom-form/bottom-form.component";
import { AsideBottomFormComponent } from "../../components/aside-bottom-form/aside-bottom-form.component";

@Component({
  selector: 'app-bottom-page',
  imports: [BottomFormComponent, AsideBottomFormComponent],
  templateUrl: './bottom-page.component.html',
  styleUrl: './bottom-page.component.css'
})
export class BottomPageComponent {

}
