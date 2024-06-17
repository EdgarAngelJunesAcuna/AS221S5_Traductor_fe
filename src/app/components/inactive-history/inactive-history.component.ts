// inactive-history.component.ts
import { Component, OnInit } from '@angular/core';
import { TranslatorService } from 'src/app/service/translator.service';

@Component({
  selector: 'app-inactive-history',
  templateUrl: './inactive-history.component.html',
  styleUrls: ['./inactive-history.component.css']
})
export class InactiveHistoryComponent implements OnInit {
  translations: any[] = [];

  constructor(private translatorService: TranslatorService) { }

  ngOnInit(): void {
    this.getAllInactiveTranslations();
  }

  getAllInactiveTranslations(): void {
    this.translatorService.getAllInactiveTranslations().subscribe(
      translations => {
        console.log('Received inactive translations:', translations);
        this.translations = translations;
      },
      error => {
        console.error('Error fetching inactive translations:', error);
      }
    );
  }

  activateTranslation(id: number): void {
    this.translatorService.activateTranslation(id).subscribe({
      next: () => {
        console.log('Translation reactivated');
        window.location.reload(); // Recarga la página para reflejar los cambios
      },
      error: (error) => {
        console.error('Error reactivating translation:', error);
        alert('Se a activado con exito'); // Muestra una alerta de error
        window.location.reload(); // Recarga la página después de que el usuario presiona "Aceptar"
      }
    });
  }
}