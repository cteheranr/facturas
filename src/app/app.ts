import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('recibos');
  pagos: any[] = [];
  valorInput: string = '';
  valorNumero: number = 0;
  pago = {
    estudiante: '',
    valorTotal: 0,
    valorLetras: '',
    concepto: '',
    metodosPago: [
      {
        medio: '',
        valor: 0,
        referencia: '',
      },
    ],
    fecha: new Date().toString(),
    referencia: '',
  };

  mostrarImpresion = false;
  pagoImprimir: any = {
    estudiante: '',
    valorTotal: 0,
    valorLetras: '',
    concepto: '',
    metodosPago: [
      {
        medio: '',
        valor: 0,
        referencia: '',
      },
    ],
    fecha: new Date().toString(),
    referencia: '',
  };

  ngOnInit(): void {
    const data = localStorage.getItem('pagos');
    console.log(this.pagoImprimir.metodosPago.length)
    if (data) {
      this.pagos = JSON.parse(data);
    }
  }

  onValorChange() {
    this.pago.valorLetras = this.numeroALetras(this.pago.valorTotal);
  }

  guardarPago() {
    const nuevoPago = { ...this.pago };

    if (this.pago.metodosPago.length > 1 && this.totalMetodos() !== this.pago.valorTotal) {
      alert('La suma de los medios de pago no coincide con el total');
      return;
    }

    this.pagos.push(nuevoPago);

    localStorage.setItem('pagos', JSON.stringify(this.pagos));

    this.pagoImprimir = nuevoPago;

    if (this.pagoImprimir.valorTotal && typeof this.pagoImprimir.valorTotal === 'number') {
      this.pagoImprimir.valorTotal.toString();
      const limpio = this.pagoImprimir.valorTotal.toString().replace(/\D/g, '');
      this.pagoImprimir.valorTotal = limpio.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    this.mostrarImpresion = true;

    setTimeout(() => {
      window.print();
    }, 300);

    this.pago = {
      estudiante: '',
      valorTotal: 0,
      valorLetras: '',
      concepto: '',
      metodosPago: [
        {
          medio: '',
          valor: 0,
          referencia: '',
        },
      ],
      fecha: '',
      referencia: '',
    };
  }

  refescarPages() {
    this.mostrarImpresion = false;
  }

  numeroALetras(num: number): string {
    if (num === 0) return 'CERO';

    const unidades = [
      '',
      'UNO',
      'DOS',
      'TRES',
      'CUATRO',
      'CINCO',
      'SEIS',
      'SIETE',
      'OCHO',
      'NUEVE',
    ];

    const especiales = [
      'DIEZ',
      'ONCE',
      'DOCE',
      'TRECE',
      'CATORCE',
      'QUINCE',
      'DIECISÉIS',
      'DIECISIETE',
      'DIECIOCHO',
      'DIECINUEVE',
    ];

    const decenas = [
      '',
      '',
      'VEINTE',
      'TREINTA',
      'CUARENTA',
      'CINCUENTA',
      'SESENTA',
      'SETENTA',
      'OCHENTA',
      'NOVENTA',
    ];

    const centenas = [
      '',
      'CIENTO',
      'DOSCIENTOS',
      'TRESCIENTOS',
      'CUATROCIENTOS',
      'QUINIENTOS',
      'SEISCIENTOS',
      'SETECIENTOS',
      'OCHOCIENTOS',
      'NOVECIENTOS',
    ];

    const unidadMillar = [
      '',
      'UN MILLON',
      'DOS MILLONES',
      'TRES MILLONES',
      'CUATRO MILLONES',
      'CINCO MILLONES',
      'SEIS MILLONES',
      'SIETE MILLONES',
      'OCHO MILLONES',
      'NUEVE MILLONES',
    ];

    if (num === 100) return 'CIEN';

    if (num < 10) return unidades[num];

    if (num < 20) return especiales[num - 10];

    if (num < 100) {
      const d = Math.floor(num / 10);
      const u = num % 10;

      if (num >= 20 && num < 30) {
        return u === 0 ? 'VEINTE' : 'VEINTI' + unidades[u];
      }

      return decenas[d] + (u ? ' Y ' + unidades[u] : '');
    }

    if (num < 1000) {
      const c = Math.floor(num / 100);
      const r = num % 100;
      return centenas[c] + (r ? ' ' + this.numeroALetras(r) : '');
    }

    if (num < 1000000) {
      const miles = Math.floor(num / 1000);
      const resto = num % 1000;

      const milesTexto = miles === 1 ? 'MIL' : this.numeroALetras(miles) + ' MIL';

      return milesTexto + (resto ? ' ' + this.numeroALetras(resto) : '');
    }

    const millones = Math.floor(num / 1000000);
    const resto = num % 1000000;

    const textoMillones = millones === 1 ? 'UN MILLÓN' : this.numeroALetras(millones) + ' MILLONES';

    return textoMillones + (resto ? ' ' + this.numeroALetras(resto) : '');
  }

  agregarMetodo() {
    this.pago.metodosPago.push({
      medio: '',
      valor: 0,
      referencia: '',
    });
  }

  eliminarMetodo(index: number) {
    this.pago.metodosPago.splice(index, 1);
  }

  totalMetodos(): number {
    return this.pago.metodosPago.reduce((sum, m) => sum + Number(m.valor || 0), 0);
  }
}
