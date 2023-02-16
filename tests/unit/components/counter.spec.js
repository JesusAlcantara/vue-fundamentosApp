import { shallowMount, mount } from '@vue/test-utils'
import Counter from '@/components/Counter'

const wrapper = shallowMount(Counter);

describe('Counter Component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Counter);
    })
    // it('debe hacer match con el snapshot', () => {
    //     expect(wrapper.html()).toMatchSnapshot();
    // })

    it('h2 debe de tener el valor por defecto', () => {
        const h2 = wrapper.find('h2');
        expect(h2.text()).toBe('Counter');
    })

    it('el valor por defecto debe de ser 100 en el <p>', () => {
        const value = wrapper.find('[data-testid="counter"]');
        expect(value.text()).toBe('100');
    })

    it('debe de incrementar y decrementar el contador', async () => {
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button');
        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');

        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        const value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe('101');
    })

    it('debe establecer valor por defecto', () => {
        const { start } = wrapper.props();
        const value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe(String(start));
    })

    it('debe mostrar la prop title', () => {
        const title = 'Hola Mundo';
        const wrapper = shallowMount(Counter, {
            props: {
                title: 'Hola Mundo',
                start: 5
            }
        });
        expect(wrapper.find('h2').text()).toBe(title);
    })
})