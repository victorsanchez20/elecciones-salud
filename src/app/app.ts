import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Candidato {
  id: number;
  nombre: string;
  foto: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Elecciones Salud');

  paso = signal(1); // 1: DNI, 2: Datos, 3: Votar, 4: Gracias

  dniForm = new FormGroup({
    dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)])
  });

  datosForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  candidatos: Candidato[] = [
    { id: 1, nombre: 'Candidato 1', foto: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=C1' },
    { id: 2, nombre: 'Candidato 2', foto: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=C2' },
    { id: 3, nombre: 'Candidato 3', foto: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=C3' },
    { id: 4, nombre: 'Candidato 4', foto: 'https://via.placeholder.com/150/FFFF00/FFFFFF?text=C4' },
    { id: 5, nombre: 'Candidato 5', foto: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=C5' },
    { id: 6, nombre: 'Candidato 6', foto: 'https://via.placeholder.com/150/00FFFF/FFFFFF?text=C6' },
    { id: 7, nombre: 'Candidato 7', foto: 'https://via.placeholder.com/150/800080/FFFFFF?text=C7' },
    { id: 8, nombre: 'Candidato 8', foto: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=C8' }
  ];

  candidatoSeleccionado = signal<Candidato | null>(null);

  siguientePaso() {
    if (this.paso() === 1 && this.dniForm.valid) {
      this.paso.set(2);
    } else if (this.paso() === 2 && this.datosForm.valid) {
      this.paso.set(3);
    }
  }

  seleccionarCandidato(candidato: Candidato) {
    this.candidatoSeleccionado.set(candidato);
  }

  votar() {
    if (this.candidatoSeleccionado()) {
      this.paso.set(4);
    }
  }

  reiniciar() {
    this.paso.set(1);
    this.dniForm.reset();
    this.datosForm.reset();
    this.candidatoSeleccionado.set(null);
  }
}
