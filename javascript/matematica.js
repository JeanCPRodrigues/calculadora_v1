/* SCRIPT CRIADO POR JEAN C. P. RODRIGUES */
(function () {
    'use strict';

    /* VARIAVEIS DE AMBIENTE */
    let displayMain = '#displayHistoryCalculadoraV1';
    let displaySecondary = '#displayCalculadoraV1';

    /* SELETOR SIMPLES PADRAO */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /* EVENTO DE LISTAGEM SIMPLES PADRAO */
    const on = (type, el, listener, all = true) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    const validKey = (value) => {

        let mainInputDisplay = select(displayMain);
        let secondaryInputDisplay = select(displaySecondary);
        let valInputMain = parseInt(mainInputDisplay.value);
        let valInputSec = parseInt(secondaryInputDisplay.value);
        let clickMath = parseInt(secondaryInputDisplay.getAttribute('click-math'));
        let valPrimary = parseInt(secondaryInputDisplay.getAttribute('primary-math'));
        let valSecondary = parseInt(secondaryInputDisplay.getAttribute('secondary-math'));
        let valOperator = secondaryInputDisplay.getAttribute('type-math');
        let numPress = parseInt(value);

        /* APAGAR TUDO DENTRO DA DISPLAY MAIN */
        if (value == 'CE') {
            clearAllDisplayMain();
            return;
        }
        if (value == 'C') {
            clearAllDisplaySecondary();
            clearAllDisplayMain();
            return;
        }
        if (value == '+') {

            if (clickMath == 0) {

                secondaryInputDisplay.setAttribute('click-math', 1);
                secondaryInputDisplay.setAttribute('primary-math', valPrimary + valInputMain);
                secondaryInputDisplay.setAttribute('secondary-math', valPrimary);
                console.log(valInputMain, valPrimary, valInputMain);
                insertNumDisplaySecondary(`${valInputMain + valPrimary} + `);
                mainInputDisplay.value = 0;
                insertNumDisplayMain(valPrimary + valInputMain);

            }
            return;

        }
        if (value == '=') {

            let valMain = parseInt(mainInputDisplay.value);
            let valPrimaryDisplaySecondary = parseInt(secondaryInputDisplay.getAttribute('primary-math'));
            let valSecondaryDisplaySecondary = parseInt(secondaryInputDisplay.getAttribute('secondary-math'));
            let operadordDisplaySecondary = secondaryInputDisplay.getAttribute('type-math')
            let somaCalc = valSecondaryDisplaySecondary + valMain;

            secondaryInputDisplay.setAttribute('primary-math', somaCalc);
            // secondaryInputDisplay.setAttribute('secondary-math', valMain);

            console.log(valPrimaryDisplaySecondary, valMain, somaCalc, valSecondaryDisplaySecondary);
            insertNumDisplaySecondary(`${valPrimaryDisplaySecondary} ${operadordDisplaySecondary} ${valSecondaryDisplaySecondary} =`);
            insertNumDisplayMain(somaCalc)
            return;

        }
        if (numPress && numPress >= 0 || numPress <= 9) {
            
            if (clickMath == 1) {
                secondaryInputDisplay.setAttribute('click-math', 0);
                mainInputDisplay.value = 0;
            }
            insertNumDisplayMain(value);

        }

    }

    /* LIMPA O DISPLAY PRINCIPAL */
    const clearAllDisplayMain = () => {

        let mainInputDisplay = select(displayMain);
        mainInputDisplay.value = 0

    }
    /* LIMPAR O DISPLAY SECONDARY */
    const clearAllDisplaySecondary = () => {

        let secondaryInputDisplay = select(displaySecondary);
        secondaryInputDisplay.setAttribute('primary-math', 0);
        secondaryInputDisplay.setAttribute('secondary-math', 0);
        secondaryInputDisplay.value = ''

    }

    /* INSERE UM NUMERO NO DISPLAY PRINCIPAL */
    const insertNumDisplayMain = (value) => {

        let mainInputDisplay = select(displayMain);
        let valueInputLast = mainInputDisplay.value;
        let splitValueInputLast = valueInputLast.split('');

        // VERIFICA SE O NUMERO COMEÇA COM ZERO
        if (valueInputLast == 0) {
            mainInputDisplay.value = value;
        } else {
            mainInputDisplay.value = valueInputLast += value;
        }

    }
    /* INSERE UM VALOR NO INPUT SECONDARY */
    const insertNumDisplaySecondary = (value) => {

        let secondaryInputDisplay = select(displaySecondary);
        secondaryInputDisplay.value = value

    }

    /* VERIFICA SE O VALOR E UM NUMERO INTEIRO */
    const backspaceDisplayMain = (value) => {

        console.log(typeValInt, typeValFloat)

    }

    /* AO PRESSIONAR O TECLADO */
    window.addEventListener('keypress', (e) => {

        let isTrusted, altKey, charCode, code,
            ctrlKey, key, keyCode, shiftKey;
        isTrusted = e.isTrusted;
        altKey = e.altKey;
        charCode = e.charCode;
        code = e.code;
        ctrlKey = e.ctrlKey;
        key = e.key;
        keyCode = e.keyCode;
        shiftKey = e.shiftKey;

        let numPress = parseInt(key)

        if (numPress && numPress >= 0 || numPress <= 9) {
            validKey(numPress);
        }

    });

    /* AO PRESSIONAR QUALQUER TECLAS COM OBJETIVO [BACKSPACE] */
    window.addEventListener('keyup', (e) => {

        let isTrusted, altKey, charCode, code,
            ctrlKey, key, keyCode, shiftKey;
        isTrusted = e.isTrusted;
        altKey = e.altKey;
        charCode = e.charCode;
        code = e.code;
        ctrlKey = e.ctrlKey;
        key = e.key;
        keyCode = e.keyCode;
        shiftKey = e.shiftKey;

        if (key == 'Backspace') {
            console.log('Apagado')
        }

    });

    /* AO SELECIONAR O BOTAO APENAS BOTOES COM OS ATRIBUTOS [DATA-MATH] SERAO ACEITOS */
    on('click', '.btn', function (e) {
        let keyMath = this.getAttribute('data-math');
        if (keyMath) { validKey(keyMath) }
    });

})()