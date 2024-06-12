import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-carga',
  templateUrl: './pagina-carga.component.html',
  styleUrls: ['./pagina-carga.component.css']
})
export class PaginaCargaComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.createFallingBars();
    this.fakeLoading();
  }

  createFallingBars() {
    const fallingBarsContainer = document.querySelector('.falling-bars') as HTMLElement;
    for (let i = 0; i < 10; i++) {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      fallingBarsContainer.appendChild(bar);
    }
  }

  fakeLoading() {
    const loadingBar = document.querySelector('.loading-bar') as HTMLElement;
    let width = 0;

    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.showFallingBarsAgain();
        }, 1000);
      } else {
        width += 2;
        loadingBar.style.width = width + '%';
      }
    }, 50);
  }

  showFallingBarsAgain() {
    const fallingBarsContainer = document.querySelector('.falling-bars') as HTMLElement;
    fallingBarsContainer.innerHTML = '';
    this.createFallingBars();
    setTimeout(() => {
      this.router.navigate(['/pagina-inicio']);
    }, 2000); // Tiempo para mostrar las barras antes de redirigir
  }
}
