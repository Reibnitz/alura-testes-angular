import { LikeWidgetModule } from './like-widget.module';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeWidgetComponent } from './like-widget.component';

describe(LikeWidgetComponent.name, () => {
    let component: LikeWidgetComponent;
    let fixture: ComponentFixture<LikeWidgetComponent>;

    beforeEach(async () => {
        await TestBed
        .configureTestingModule({ imports: [LikeWidgetModule] })
        .compileComponents(); // Método compileComponents é async. Não é necessário usar ele, mas é recomendável

        // declarations: [LikeWidgetComponent],
        // providers: [UniqueIdService],
        // imports: [FontAwesomeModule]
        // Necessário declarar todos os providers e imports utilizados pelo component caso não importe o módulo
        // Comum em casos de TDD
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;

        // fixture.detectChanges();
        // REMOVER! Método chama o ngOnInit, o que interfere com possíveis lógicas passadas pelo @Input()
        // Exemplo linha 41
    });

    it('Should create an ID during ngOnInit() when (@Input id) is not assigned', () => {
        fixture.detectChanges(); // Inicia o lifecycle do componente
        expect(component.id).toBeTruthy(); // Não funciona sem fixture.detectChanges()
    });

    it('Should NOT create an Id during ngOnInit() when (@Input id) has been assigned', () => {
        component.id = 'someId';
        fixture.detectChanges();
        expect(component.id).toBe('someId');
    });

    it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger (@Output liked) when called`, (done) => {
        fixture.detectChanges();
        component.liked.subscribe( () => {
            expect(true).toBeTrue();
            done();
        });
        component.like();

        // É necessário dar subscribe antes de chamar o método ao testar emissões de observable
        // Para garantir a acusação de erro, se aponta uma função de callback (done)
        // para ser chamada no bloco async. Se não for chamado, dará erro de timeout
    });

    it(`#${LikeWidgetComponent.prototype.like.name}
    SPY should trigger (@Output liked) when called`, () => {
        // Mesmo teste que o método anterior, porém utilizando o Spy sem callback (done)

        spyOn(component.liked, 'emit'); // Primeiro definir o spy
        fixture.detectChanges();
        component.like(); // Depois realizar a chamada

        expect(component.liked.emit).toHaveBeenCalled(); // Porfim verificar se a chamada foi realizada
    });
});
