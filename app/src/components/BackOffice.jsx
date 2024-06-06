import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ControlSidebar from './ControlSidebar';

function BackOffice(props) {
    return (
        <>
            <div className="wrapper">
                <Navbar />
                <Sidebar />
                <div className="content-wrapper">

                    <section className='content-header'>
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <h1>{props.title}</h1>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className='content'>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            {props.children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
                <Footer />
                <ControlSidebar />
            </div>
        </>
    )
}

export default BackOffice