import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {

  listaPagos: any[] = [];

  ngOnInit(): void {
    this.listaPagos = this.obtenerPagos();
  }

  obtenerPagos(): any[] {
    const pagosData = localStorage.getItem('pagos'); // Asumiendo que la llave es 'pagos'
    if (pagosData) {
      return JSON.parse(pagosData);
    }
    return [];
  }
  //   busqueda: string = '';
  // pagos: any[] = [];
  // resultados: any[] = [];

  // ngOnInit() {
  //   const data = localStorage.getItem('pagos');

  //   if (data) {
  //     this.pagos = JSON.parse(data).map((p: any) => ({
  //       ...p,
  //       fecha: new Date(p.fecha)
  //     }));
  //   }
  // }

  // buscar() {
  //   const texto = this.busqueda.toLowerCase().trim();

  //   this.resultados = this.pagos.filter(p =>
  //     p.estudiante.toLowerCase().includes(texto)
  //   );
  // }

  // totalPagado(pago: any): number {
  //   return pago.metodosPago
  //     .reduce((sum: number, m: any) => sum + Number(m.valor || 0), 0);
  // }
  
}
