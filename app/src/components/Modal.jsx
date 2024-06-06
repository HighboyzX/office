import { _msg } from "../messages/MsgTh";

function Modal({ id, title, event, closeModalButton, size, hideFooter, children }) {
    return (
        <>
            <div className="modal" tabIndex={-1} id={id}>
                <div className={!size ? 'modal-dialog' : `modal-dialog modal-${size}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id={closeModalButton}>
                                <span aria-hidden="true"><i className="fa-solid fa-xmark"></i></span>
                            </button>
                        </div>
                        <form onSubmit={event}>
                            <div className="modal-body">
                                <div>
                                    {children}
                                </div>
                            </div>
                            {hideFooter ? <></> :
                                <div className="modal-footer">
                                    <button type="button" className="btn btn btn-dark" data-dismiss="modal">{_msg.cancel}</button>
                                    <button type="submit" className="btn btn btn-success">{_msg.ok}</button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Modal