import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

//Import Images
import key from '../img/key.svg'
import tap from '../img/tap.svg'
import door from '../img/door.svg'

class Coast extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-12 col-lg-6 justify-content-center d-flex align-items-center" id="bg-coast">
                    <div className="row">
                        <div className="col-12 col-md-12 col-xl-7 col-lg-9 offset-lg-2">
                            <p className="coast-title">Quanto você gasta <br />com sua casa?</p>
                            <p className="coast-subtitle">Já tentou calcular quanto custa a manutenção básica da sua casa em um ano? Inclua nos cálculos aquela janela quebrada, a geladeira queimada e a pia entupida. <br />A segure.ai garante o melhor custo-benefício para os seus assegurados. Com um pequeno valor mensal você não precisa mais se preocupar com emergências do dia a dia.</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6" id="box-elements-coast">
                    <div className="first-elements-coast row justify-content-right align-items-center">
                        <img className="coast-icon col-3" src={key} alt="Icone de uma chave" />
                        <p className="col-9 justify-content-center align-items-center coast-text-elements">
                            <strong>Perdeu as chaves?</strong> A visita de um chaveiro custa em média <strong>R$150,00</strong> + o custo de chaves e fechaduras novas.
                        </p>
                    </div>
                    <div className="second-elements-coast row justify-content-right align-items-center">
                        <img className="coast-icon col-3" src={tap} alt="Icone de uma pia" />
                        <p className="col-9 justify-content-center align-items-center coast-text-elements">
                            <strong>Vazamento na cozinha?</strong> O bombeiro hidráulico vai custar em média <strong>R$200,00</strong> + materiais.
                        </p>
                    </div>
                    <div className="third-elements-coast row justify-content-right align-items-center">
                        <img className="coast-icon col-3" src={door} alt="Icone de uma janela" />
                        <p className="col-9 justify-content-center align-items-center coast-text-elements">
                            <strong>O box do banheiro quebrou?</strong> a troca da peça pode ficar entre <strong>R$370,00 e R$700,00</strong> dependendo do tipo e modelo.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Coast
