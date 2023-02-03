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

    /* FUNCAO QUE CALCULA */
    function CalcMath(operacao, num1, num2) {
        switch (operacao) {
            case "+":
                return Math.round(num1 + num2);
            case "-":
                return Math.round(num1 - num2);
            case "*":
                return Math.round(num1 * num2);
            case "/":
                return Math.round(num1 / num2);
            default:
                return "Operação Inválida!";
        }
    }

    /* VALIDA AS OPERACAO */
    const validKey = (value) => {

        let mainInputDisplay = select(displayMain);
        let secondaryInputDisplay = select(displaySecondary);
        let valInputMain = parseInt((mainInputDisplay.value).replace(/[.,R$]/g, ''));
        let valInputSec = parseInt((secondaryInputDisplay.value).replace(/[.,R$]/g, ''));
        let clickMath = parseInt(secondaryInputDisplay.getAttribute('click-math'));
        let valPrimary = parseInt(secondaryInputDisplay.getAttribute('primary-math'));
        let valSecondary = parseInt(secondaryInputDisplay.getAttribute('secondary-math'));
        let valHistory = parseInt(secondaryInputDisplay.getAttribute('history-math'));
        let valOperator = secondaryInputDisplay.getAttribute('type-math');
        let numPress = parseInt(value);

        console.info([
            {
                "mainInputDisplay": mainInputDisplay,
                "secondaryInputDisplay": secondaryInputDisplay,
                "valInputMain": valInputMain,
                "valInputSec": valInputSec,
                "clickMath": clickMath,
                "valPrimary": valPrimary,
                "valSecondary": valSecondary,
                "valHistory": valHistory,
                "valOperator": valOperator,
                "numPress": numPress,
                "value": value
            }
        ]);

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

            secondaryInputDisplay.setAttribute('type-math', '+');
            if (clickMath == 0) {

                secondaryInputDisplay.setAttribute('click-math', 1);
                secondaryInputDisplay.setAttribute('primary-math', valPrimary + valInputMain);
                secondaryInputDisplay.setAttribute('secondary-math', valPrimary);
                mainInputDisplay.value = 0;
                insertNumDisplaySecondary(`${valInputMain + valPrimary} + `);
                insertNumDisplayMain(valPrimary + valInputMain);

            }
            return;

        }
        if (value == '-') {

            secondaryInputDisplay.setAttribute('type-math', '-');
            if (clickMath == 0) {

                secondaryInputDisplay.setAttribute('click-math', 1);
                secondaryInputDisplay.setAttribute('primary-math', valPrimary + valInputMain);
                secondaryInputDisplay.setAttribute('secondary-math', valPrimary);
                mainInputDisplay.value = 0;
                insertNumDisplaySecondary(`${valPrimary + valSecondary} - `);
                insertNumDisplayMain(valPrimary + valSecondary);

            }
            return;

        }
        if (value == '=') {

            secondaryInputDisplay.setAttribute('primary-math', valPrimary + valSecondary);
            mainInputDisplay.value = 0;
            if (clickMath == 0) {
                secondaryInputDisplay.setAttribute('click-math', 1);
                secondaryInputDisplay.setAttribute('secondary-math', valInputMain);
                mainInputDisplay.value = 0;
                secondaryInputDisplay.setAttribute('history-math', valPrimary);
                insertNumDisplaySecondary(`${formatNumInt(valPrimary)} + ${formatNumInt(valInputMain)} =`);
                insertNumDisplayMain(valInputMain + valPrimary);
            } else {
                secondaryInputDisplay.setAttribute('history-math', valInputMain);
                insertNumDisplaySecondary(`${formatNumInt(valInputMain)} + ${formatNumInt(valSecondary)} =`);
                insertNumDisplayMain(valInputMain + valSecondary);
            }
            return;

        }
        if (value == 'BACKSPACE') {

            let boxMain = JSON.stringify(valInputMain);
            let newArray = replaceLastItem(boxMain);
            mainInputDisplay.value = 0;
            if (newArray >= 0) {
                insertNumDisplayMain(newArray);
            }
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

        // VERIFICA SE O NUMERO COMEÇA COM ZERO
        if (valueInputLast == 0) {
            mainInputDisplay.value = formatNumInt(value);
        } else {
            let num = valueInputLast += value;
            num = num.replace(/[.,R$]/g, '');
            mainInputDisplay.value = formatNumInt(num);
        }

    }
    /* INSERE UM VALOR NO INPUT SECONDARY */
    const insertNumDisplaySecondary = (value) => {

        let secondaryInputDisplay = select(displaySecondary);
        secondaryInputDisplay.value = value

    }

    /* REMOVER O ULTIMOS ITEM DE UM ARRAY */
    const replaceLastItem = (data) => {
        data = data.replace(/[.,R$]/g, '');
        data = data.split('');
        data.pop();
        return (data.toString()).replace(/[,]/g, '');

    }

    /* FORMATAR NUMERO */
    const formatNumInt = (num) => {
        num = new Intl.NumberFormat('pt-BR').format(num);
        return num;
    }

    /* AO PRESSIONAR QUALQUER TECLAS COM OBJETIVO [BACKSPACE] */
    window.addEventListener('keydown', (e) => {

        let mainInputDisplay = select(displayMain);
        let secondaryInputDisplay = select(displaySecondary);
        let valInputMain = parseInt((mainInputDisplay.value).replace(/[.,R$]/g, ''));
        let valInputSec = parseInt((secondaryInputDisplay.value).replace(/[.,R$]/g, ''));
        let clickMath = parseInt(secondaryInputDisplay.getAttribute('click-math'));
        let valPrimary = parseInt(secondaryInputDisplay.getAttribute('primary-math'));
        let valSecondary = parseInt(secondaryInputDisplay.getAttribute('secondary-math'));
        let valHistory = parseInt(secondaryInputDisplay.getAttribute('history-math'));
        let valOperator = secondaryInputDisplay.getAttribute('type-math');


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
        /* AO CLICAR EM APAGAR NO TECLADO */
        if (key == 'Backspace') {

            validKey('BACKSPACE');

        }
        /* AO CLICLAR EM MAIS NO TECLADO */
        if (key == '+') {
            validKey('+');
        }
        /* AO CLICLAR EM MENOS NO TECLADO */
        if (key == '-') {
            validKey('-');
        }
        /* AO CLICAR EM IGUAL NO TECLADO */
        if (key == 'Enter') {
            validKey('=');
        }
        /* AO CLICAR APENAS EM DELETE */
        if (key == 'Delete' && !ctrlKey) {
            validKey('CE');
        }
        /* AO CLICAR EM CTRL + DELETE */
        if (key == 'Delete' && ctrlKey) {
            validKey('C');
        }


        /* LOG DE TECLAS PRESSIONADAS */
        console.log([
            {
                "isTrusted": isTrusted,
                "altKey": altKey,
                "charCode": charCode,
                "code": code,
                "ctrlKey": ctrlKey,
                "key": key,
                "keyCode": keyCode,
                "shiftKey": shiftKey
            }
        ])

    });

    /* AO SELECIONAR O BOTAO APENAS BOTOES COM OS ATRIBUTOS [DATA-MATH] SERAO ACEITOS */
    on('click', '.btn', function (e) {
        let keyMath = this.getAttribute('data-math');
        if (keyMath) { validKey(keyMath) }
    });

    /* AO CLICAR EM ESTILO DA CALCULADORA */
    on('click', '.estilo-calculadora', function (e) {
        let elemento = document.querySelector(".section-calc-1"); 
        elemento.classList.toggle("section-center");
    });

})()