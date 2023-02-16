import { shallowMount } from "@vue/test-utils";
import Indecision from '@/components/Indecision';

describe('Indecision Component', () => {
    let wrapper;
    let clgSpy;

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }));

    beforeEach(() => {
        wrapper = shallowMount(Indecision);
        clgSpy = jest.spyOn(console, 'log');
        jest.clearAllMocks();
    })

    it('debe hacer match con el snap', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })
    
    it('no debe disparar nada al escribir en input (clg)', async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

        const input = wrapper.find('input');
        await input.setValue('Hola Mundo');

        expect(clgSpy).toHaveBeenCalledTimes(1);
        expect(getAnswerSpy).not.toHaveBeenCalled();
    })

    it('debe disparar fetch al escribir el símbolo "?"', async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

        const input = wrapper.find('input');
        await input.setValue('Hola Mundo?');

        expect(clgSpy).toHaveBeenCalledTimes(2);
        expect(getAnswerSpy).toHaveBeenCalled();
    })

    describe('Pruebas en getAnswer', () => {
        it('debe dar prueba correta', async () => {
            await wrapper.vm.getAnswer();
            const img = wrapper.find('img');
            expect(img.exists()).toBeTruthy();
            expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif');
            expect(wrapper.vm.answer).toBe('Si!');
        })

        it('debe dar fallo en la API', async () => {
            fetch.mockImplementationOnce(() => Promise.reject('API is down'));
            await wrapper.vm.getAnswer();
            const img = wrapper.find('img');
            expect(img.exists()).toBeFalsy();
            expect(wrapper.vm.answer).toBe('No se pudo cargar del API');
        })
    })
})