import { Component, OnInit } from '@angular/core';
import { TranslatorService } from 'src/app/service/translator.service';

@Component({
  selector: 'app-traductor-history',
  templateUrl: './traductor-history.component.html',
  styleUrls: ['./traductor-history.component.css']
})
export class TraductorHistoryComponent implements OnInit {
  translations: any[] = [];

  constructor(private translatorService: TranslatorService) { }

  ngOnInit(): void {
    this.getAllTranslations();
  }

  getAllTranslations(): void {
    this.translatorService.getAllTranslations().subscribe(
      translations => {
        console.log('Received translations:', translations);
        this.translations = translations;
      },
      error => {
        console.error('Error fetching translations:', error);
      }
    );
  }

  deleteTranslation(id: number): void {
    if (confirm('Are you sure you want to delete this translation?')) {
      this.translatorService.deleteTranslation(id).subscribe(
        () => {
          this.translations = this.translations.filter(t => t.id !== id);
        },
        error => {
          console.error('Error deleting translation:', error);
        }
      );
    }
  }
}
