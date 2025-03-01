import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RiotService } from '../../services/riot.service';

@Component({
  selector: 'app-aside-bottom-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aside-bottom-form.component.html',
  styleUrl: './aside-bottom-form.component.css'
})
export class AsideBottomFormComponent {
  playerForm: FormGroup;
  successMessage: string = ''; 
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private _riotService: RiotService) {
    this.playerForm = this.fb.group({
      summonerName: ['', [Validators.required]], 
      tag: ['', [Validators.required]] 
    });
  }


  onSubmit(): void {
    if (this.playerForm.valid) {
      this.successMessage = ''; // Limpia mensajes previos
      this.errorMessage = '';
      this.isLoading = true; // Activa el loader

      const { summonerName, tag, line } = this.playerForm.value;

      this._riotService.fetchPlayerData(summonerName, tag, line).subscribe(
        (response) => {
          this.successMessage = response.message; // Muestra el mensaje de éxito
          this.isLoading = false; // Desactiva el loader
        },
        (error) => {
          console.error('Error fetching player data:', error);
          this.errorMessage = 'An error occurred while processing the data.';
          this.isLoading = false; // Desactiva el loader
        }
      );
    }
  }
}
