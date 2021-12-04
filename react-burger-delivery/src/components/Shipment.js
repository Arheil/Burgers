import React, {Component} from "react";

class Shipment extends Component {
    render() {
        const { total } = this.props;
        const shipping = total > 0 && total < 500 ? 350 : 0;
        const shippingNeon = shipping === 0 ? (
            <span className='font-effect-neon total_wrap-cheap'>
                {shipping} ₽
            </span>
        ) : (
            <span>{shipping} ₽</span>
        );

        return (
            <div className='total'>
                <div className='total_wrap'>
                    <div>
                        <div>Доставка: {total > 0 ? shippingNeon : null}</div>
                        <div className='total_wrap-free'>
                            {total < 500 ? `Закажите ещё на ${500 - total} для бесплатной доставки` : null}
                        </div>
                    </div>

                    <div className='total_wrap-final'>Итого: {total} ₽</div>
                </div>
            </div>
        )
    }
}

export default Shipment;