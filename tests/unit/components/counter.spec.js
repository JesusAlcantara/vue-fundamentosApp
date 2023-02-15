import { shallowMount, mount } from '@vue/test-utils'
import Counter from '@/components/Counter'

const wrapper = shallowMount(Counter);

describe('Counter Component', () => {
    // it('debe hacer match con el snapshot', () => {
    //     // Arrange.
    //     // Act.
    //     // Assert.
    //     expect(wrapper.html()).toMatchSnapshot();
    // })

    it('h2 debe de tener el valor por defecto', () => {
        const h2 = wrapper.find('h2');
        expect(h2.text()).toBe('Counter');
    })
})