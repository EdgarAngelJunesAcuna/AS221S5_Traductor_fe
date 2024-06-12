import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SweetAlertResult } from 'sweetalert2';
import autoTable from 'jspdf-autotable'; // Importa el complemento
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Language {
  icon: string;
  name: string;
  iso1: string;
  iso2: string;
}

@Component({
  selector: 'app-idiomas-disponibles',
  templateUrl: './idiomas-disponibles.component.html',
  styleUrls: ['./idiomas-disponibles.component.css']
})
export class IdiomasDisponiblesComponent implements OnInit, AfterViewInit {
  data: Language[] = [
    { icon: '/assets/bandera-idiomas/Abkhaz.png', name: 'Abkhaz', iso1: 'ab', iso2: 'abk' },
    { icon: '/assets/bandera-idiomas/Afar.png', name: 'Afar', iso1: 'aa', iso2: 'aar' },
    { icon: '/assets/bandera-idiomas/Africanos.png', name: 'Africanos', iso1: 'af', iso2: 'afr' },
    { icon: '/assets/bandera-idiomas/Akan.png', name: 'Akan', iso1: 'ak', iso2: 'aka' },
    { icon: '/assets/bandera-idiomas/Albania.png', name: 'Albania', iso1: 'sq', iso2: 'sqi' },
    { icon: '/assets/bandera-idiomas/Amárico.png', name: 'Amárico', iso1: 'am', iso2: 'amh' },
    { icon: '/assets/bandera-idiomas/Africanos.png', name: 'Africanos', iso1: 'af', iso2: 'afr' },
    { icon: '/assets/bandera-idiomas/Árabe.png', name: 'Árabe', iso1: 'ar', iso2: 'ara' },
    { icon: '/assets/bandera-idiomas/Aragonés.png', name: 'Aragonés', iso1: 'an', iso2: 'arg' },
    { icon: '/assets/bandera-idiomas/Armenio.png', name: 'Armenio', iso1: 'hy', iso2: 'hye' },
    { icon: '/assets/bandera-idiomas/Assamese.png', name: 'Assamese', iso1: 'as', iso2: 'asm' },
    { icon: '/assets/bandera-idiomas/Avaric.png', name: 'Avaric', iso1: 'av', iso2: 'ava' },
    { icon: '/assets/bandera-idiomas/Avestan.png', name: 'Avestan', iso1: 'ae', iso2: 'ave' },
    { icon: '/assets/bandera-idiomas/Aymara.png', name: 'Aymara', iso1: 'ay', iso2: 'aym' },
    { icon: '/assets/bandera-idiomas/Bambara.png', name: 'Bambara', iso1: 'bm', iso2: 'bam' },
    { icon: '/assets/bandera-idiomas/Bashkir.png', name: 'Bashkir', iso1: 'ba', iso2: 'bak' },
    { icon: '/assets/bandera-idiomas/Vasco.png', name: 'Vasco', iso1: 'eu', iso2: 'eus' },
    { icon: '/assets/bandera-idiomas/Belarús.png', name: 'Belarús', iso1: 'be', iso2: 'bel' },
    { icon: '/assets/bandera-idiomas/Bengalí.png', name: 'Bengalí', iso1: 'bn', iso2: 'ben' },
    { icon: '/assets/bandera-idiomas/Bihari.png', name: 'Bihari', iso1: 'bh', iso2: 'bih' },
    { icon: '/assets/bandera-idiomas/Bislama.png', name: 'Bislama', iso1: 'bi', iso2: 'bis' },
    { icon: '/assets/bandera-idiomas/Bosnia.png', name: 'Bosnia', iso1: 'bs', iso2: 'bos' },
    { icon: '/assets/bandera-idiomas/Breton.png', name: 'Breton', iso1: 'br', iso2: 'bre' },
    { icon: '/assets/bandera-idiomas/Búlgaro.png', name: 'Búlgaro', iso1: 'bg', iso2: 'bul' },
    { icon: '/assets/bandera-idiomas/Burmese.png', name: 'Burmese', iso1: 'my', iso2: 'mya' },
    { icon: '/assets/bandera-idiomas/Catalán.png', name: 'Catalán', iso1: 'ca', iso2: 'cat' },
    { icon: '/assets/bandera-idiomas/Chamorro.png', name: 'Chamorro', iso1: 'ch', iso2: 'cha' },
    { icon: '/assets/bandera-idiomas/Chechenio.png', name: 'Chechenio', iso1: 'ce', iso2: 'che' },
    { icon: '/assets/bandera-idiomas/Chichewa,Chewa,Nyanja.png', name: 'Chichewa, Chewa, Nyanja', iso1: 'ny', iso2: 'nya' },
    { icon: '/assets/bandera-idiomas/Chino.png', name: 'Chino', iso1: 'zh', iso2: 'zho' },
    { icon: '/assets/bandera-idiomas/Chuvashia.png', name: 'Chuvashia', iso1: 'cv', iso2: 'chv' },
    { icon: '/assets/bandera-idiomas/Cornualles.png', name: 'Cornualles', iso1: 'kw', iso2: 'cor' },
    { icon: '/assets/bandera-idiomas/Corso.png', name: 'Corso', iso1: 'co', iso2: 'cos' },
    { icon: '/assets/bandera-idiomas/Cree.png', name: 'Cree', iso1: 'cr', iso2: 'cre' },
    { icon: '/assets/bandera-idiomas/Croacia.png', name: 'Croacia', iso1: 'hr', iso2: 'hrv' },
    { icon: '/assets/bandera-idiomas/Checo.png', name: 'Checo', iso1: 'cs', iso2: 'ces' },
    { icon: '/assets/bandera-idiomas/Danés.png', name: 'Danés', iso1: 'da', iso2: 'dan' },
    { icon: '/assets/bandera-idiomas/Divehi,Dhivehi,Maldivas.png', name: 'Divehi,Dhivehi,Maldivas', iso1: 'dv', iso2: 'div' },
    { icon: '/assets/bandera-idiomas/Holandés.png', name: 'Holandés', iso1: 'dz', iso2: 'dzo' },
    { icon: '/assets/bandera-idiomas/Dzongkha.png', name: 'Dzongkha', iso1: 'hy', iso2: 'hye' },
    { icon: '/assets/bandera-idiomas/Inglés.png', name: 'Inglés', iso1: 'en', iso2: 'eng' },
    { icon: '/assets/bandera-idiomas/Esperanto.png', name: 'Esperanto', iso1: 'eo', iso2: 'epo' },
    { icon: '/assets/bandera-idiomas/Estonia.png', name: 'Estonia', iso1: 'et', iso2: 'est' },
    { icon: '/assets/bandera-idiomas/Ewe.png', name: 'Ewe', iso1: 'ee', iso2: 'ewe' },
    { icon: '/assets/bandera-idiomas/Faroese.png', name: 'Faroese', iso1: 'fo', iso2: 'fao' },
    { icon: '/assets/bandera-idiomas/Fiji.png', name: 'Fiji', iso1: 'fj', iso2: 'fij' },
    { icon: '/assets/bandera-idiomas/Finlandés.png', name: 'Finlandés', iso1: 'fi', iso2: 'fin' },
    { icon: '/assets/bandera-idiomas/Francés.png', name: 'Francés', iso1: 'fr', iso2: 'fra' },
    // Agrega más datos según sea necesario
  ];

  rowsPerPage = 3;
  currentPage = 1;
  totalPages = Math.ceil(this.data.length / this.rowsPerPage);
  paginatedData: Language[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.displayTablePage(this.currentPage);
  }

  ngAfterViewInit(): void {
    this.initializeSidebar();
    this.initializeMenu();
    this.initializeProgressBar();
  }

  displayTablePage(page: number) {
    const start = (page - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedData = this.data.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.displayTablePage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayTablePage(this.currentPage);
    }
  }
  
// Lógica para exportar a PDF
exportToPdf() {
  Swal.fire({
    title: 'Exportar informe',
    text: '¿Deseas exportar este informe de Clientes?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Exportar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Exportando a PDF');

      if (!this.paginatedData || this.paginatedData.length === 0) {
        console.error('No hay datos de clientes disponibles.');
        return;
      }

      const doc: any = new jsPDF('landscape'); // Forzamos el tipo a 'any'

      // Agregar fondo rojo a la izquierda de la cabecera y ajustar la altura
      doc.setFillColor(255, 165, 0); // Fondo naranja (mezcla de rojo y amarillo)
      doc.rect(0, 0, doc.internal.pageSize.width, 60, 'F'); // Rectángulo rojo para toda la cabecera

      // Agregar imagen a la izquierda de la cabecera y ajustar la altura
      const logoLeft = 'assets/Logokardex.png';
      doc.addImage(logoLeft, 'PNG', 20, 10, 40, 40); // Ajusta las coordenadas y dimensiones según tus necesidades

      // Agregar título en medio de la cabecera
      doc.setTextColor(255, 255, 255); // Texto blanco
      doc.setFontSize(20); // Tamaño del título aumentado
      const title = 'Listado de Idiomas';
      const titleWidth = doc.getStringUnitWidth(title) * 20; // Ajusta el factor según tus necesidades
      const middleOfPage = doc.internal.pageSize.width / 2;
      const titleX = middleOfPage - titleWidth / 2 + 70; // Ajusta el desplazamiento hacia la derecha y el factor según tus necesidades
      const titleY = 30; // Ajusta la posición vertical según tus necesidades
      doc.text(title, titleX, titleY);

      // Agregar imagen a la derecha de la cabecera y ajustar la altura
      const logoRight = 'assets/Logokardex.png';
      const logoRightWidth = 40; // Ajusta según sea necesario
      const logoRightHeight = 40; // Ajusta según sea necesario
      const logoRightX = doc.internal.pageSize.width - logoRightWidth - 20; // Ajusta la posición horizontal según tus necesidades
      const logoRightY = 10; // Ajusta la posición vertical según tus necesidades
      doc.addImage(logoRight, 'PNG', logoRightX, logoRightY, logoRightWidth, logoRightHeight);

      const columns = [
        { title: 'Icono', dataKey: 'icon' },
        { title: 'Nombre', dataKey: 'name' },
        { title: 'ISO1', dataKey: 'iso1' },
        { title: 'ISO2', dataKey: 'iso2' },
      ];

      const data = this.paginatedData.map(item => ({
        icon: item.icon,
        name: item.name,
        iso1: item.iso1,
        iso2: item.iso2,
      }));

      // Ajusta la posición vertical para aumentar la separación entre la cabecera y la tabla
      const separationSpace = 40; // Ajusta según sea necesario
      const startY = titleY + separationSpace;

      doc.autoTable({
        head: [columns],
        body: data,
        startY: startY,
        styles: {
          textColor: [0, 0, 0], // Color del texto de las filas (negro)
          fontSize: 10,
        },
        headStyles: {
          // Estilo de la cabecera (en este caso, a todas las columnas)
          fillColor: [255, 165, 0], // Color rojo
          textColor: [255, 255, 255], // Texto blanco
        },
      });

      doc.save('Idiomas.pdf');

      Swal.fire({
        icon: 'success',
        title: 'Informe exportado!',
        text: 'El informe de idiomas se ha exportado exitosamente.',
      });
    }
  });
}

  exportToCSV() {
    const csv = Papa.unparse(this.data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tabla.csv';
    link.click();
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'tabla.xlsx');
  }

  private initializeSidebar(): void {
    const allDropdown = document.querySelectorAll<HTMLElement>('#sidebar .side-dropdown');
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.querySelector<HTMLElement>('nav .toggle-sidebar');
    const allSideDivider = document.querySelectorAll<HTMLElement>('#sidebar .divider');

    if (!allDropdown || !sidebar || !toggleSidebar || !allSideDivider) {
      console.error('Elementos no encontrados');
      return;
    }

    allDropdown.forEach(item => {
      const a = item.parentElement?.querySelector<HTMLElement>('a:first-child');
      if (!a) return;
      this.renderer.listen(a, 'click', (e) => {
        e.preventDefault();

        if (!a.classList.contains('active')) {
          allDropdown.forEach(i => {
            const aLink = i.parentElement?.querySelector<HTMLElement>('a:first-child');
            if (aLink) {
              aLink.classList.remove('active');
              i.classList.remove('show');
            }
          });
        }

        a.classList.toggle('active');
        item.classList.toggle('show');
      });
    });

    if (sidebar.classList.contains('hide')) {
      allSideDivider.forEach(item => {
        item.textContent = '-';
      });
      allDropdown.forEach(item => {
        const a = item.parentElement?.querySelector<HTMLElement>('a:first-child');
        if (a) {
          a.classList.remove('active');
          item.classList.remove('show');
        }
      });
    } else {
      allSideDivider.forEach(item => {
        item.textContent = item.getAttribute('data-text');
      });
    }

    this.renderer.listen(toggleSidebar, 'click', () => {
      sidebar.classList.toggle('hide');

      if (sidebar.classList.contains('hide')) {
        allSideDivider.forEach(item => {
          item.textContent = '-';
        });

        allDropdown.forEach(item => {
          const a = item.parentElement?.querySelector<HTMLElement>('a:first-child');
          if (a) {
            a.classList.remove('active');
            item.classList.remove('show');
          }
        });
      } else {
        allSideDivider.forEach(item => {
          item.textContent = item.getAttribute('data-text');
        });
      }
    });

    this.renderer.listen(sidebar, 'mouseleave', () => {
      if (sidebar.classList.contains('hide')) {
        allDropdown.forEach(item => {
          const a = item.parentElement?.querySelector<HTMLElement>('a:first-child');
          if (a) {
            a.classList.remove('active');
            item.classList.remove('show');
          }
        });
        allSideDivider.forEach(item => {
          item.textContent = '-';
        });
      }
    });

    this.renderer.listen(sidebar, 'mouseenter', () => {
      if (sidebar.classList.contains('hide')) {
        allDropdown.forEach(item => {
          const a = item.parentElement?.querySelector<HTMLElement>('a:first-child');
          if (a) {
            a.classList.remove('active');
            item.classList.remove('show');
          }
        });
        allSideDivider.forEach(item => {
          item.textContent = item.getAttribute('data-text');
        });
      }
    });
  }

  private initializeMenu(): void {
    const allMenu = document.querySelectorAll<HTMLElement>('main .content-data .head .menu');

    allMenu.forEach(item => {
      const icon = item.querySelector<HTMLElement>('.icon');
      const menuLink = item.querySelector<HTMLElement>('.menu-link');
      if (!icon || !menuLink) return;

      this.renderer.listen(icon, 'click', () => {
        menuLink.classList.toggle('show');
      });

      this.renderer.listen(window, 'click', (e: Event) => {
        if (e.target !== icon && e.target !== menuLink && menuLink.classList.contains('show')) {
          menuLink.classList.remove('show');
        }
      });
    });
  }

  private initializeProgressBar(): void {
    const allProgress = document.querySelectorAll<HTMLElement>('main .card .progress');

    allProgress.forEach(item => {
      const value = item.getAttribute('data-value');
      if (value) {
        (item as HTMLElement).style.setProperty('--value', value);
      }
    });
  }

  }