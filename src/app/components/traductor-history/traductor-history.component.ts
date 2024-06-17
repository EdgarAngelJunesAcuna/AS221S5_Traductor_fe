// traductor-history.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslatorService } from 'src/app/service/translator.service';
import { Translation } from 'src/app/Models/Translation';

@Component({
  selector: 'app-traductor-history',
  templateUrl: './traductor-history.component.html',
  styleUrls: ['./traductor-history.component.css']
})
export class TraductorHistoryComponent implements OnInit {
  translations: Translation[] = [];
  editForm: FormGroup;
  showEditForm: boolean = false;
  currentEditingTranslation: Translation | null = null;

  constructor(private fb: FormBuilder, private translatorService: TranslatorService) {
    this.editForm = this.fb.group({
      request_text: [''],
      translated_text: [''],
      from_lang: [''],
      to_lang: ['']
    });
  }

  ngOnInit(): void {
    this.getAllTranslations();
  }

  openEditModal(translation: Translation): void {
    this.currentEditingTranslation = translation;
    this.editForm.patchValue(translation);
    this.showEditForm = true;
  }

  // En tu componente TypeScript
  saveEdit(): void {
    if (this.editForm.valid && this.currentEditingTranslation) {
      const updatedTranslation = {
        ...this.currentEditingTranslation,
        ...this.editForm.value
      };

      this.translatorService.editTranslation(updatedTranslation).subscribe({
        next: () => {
          console.log('Translation updated successfully.');
          window.location.reload(); // Recarga la página tras una actualización exitosa
        },
        error: (error) => {
          console.error('Error updating translation:', error);
          alert('Sea actualizado con'); // Informa al usuario del fallo
          window.location.reload(); // Recarga la página también en caso de error
        }
      });
    } else {
      alert('Please check your form fields.'); // Informa al usuario de la validación fallida
    }
  }



  getAllTranslations(): void {
    this.translatorService.getAllTranslations().subscribe(translations => this.translations = translations);
  }

  deleteTranslation(id: number): void {
    if (confirm('quieres desactivar esta respuesta?')) {
      this.translatorService.deleteTranslation(id).subscribe(() => {
        this.translations = this.translations.filter(t => t.id !== id);
      });
    }
  }
}