import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TitleComponent } from '@shared/title/title.component';
import { User } from '../../../interfaces/req-response';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title [title]="titleLabel()"></app-title>

    @if( user() ) {
    <section>
      <img [srcset]="user()!.avatar" [alt]="user()!.first_name" />
    </section>
    } @else {
    <p>Cargando Información</p>
    }

    <div>
      <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
      <p>{{ user()?.email }}</p>
    </div>
  `,
})
export default class UserComponent {
  // Con esto tenemos acceso a los params/argumentos que vienen en la url (id del usuario)
  private route = inject(ActivatedRoute);

  private usersService = inject(UsersService);

  // el toSignal nos permite tomar un observable y regresar una signal
  public user = toSignal(
    //Tenemos nuestro primer observable para tomar el id que viene como params en la URL
    this.route.params.pipe(
      switchMap(({ id }) => this.usersService.getUserById(id))
    )
  );

  public titleLabel = computed(() => {
    if (this.user()) {
      return `Información del usuario ${this.user()?.first_name} ${
        this.user()?.last_name
      }`;
    }

    return 'Informacion del usuario';
  });

  // Consideremos que esos params son un observable, ¿como lo trabajamos con signals?
  // constructor() {
  //   this.route.params.subscribe((params) => {
  //     console.log({ params });
  //   });
  // }
}
