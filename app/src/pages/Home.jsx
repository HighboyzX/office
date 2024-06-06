import { useEffect,useState } from "react";
import BackOffice from "../components/BackOffice";
import { _msg } from "../messages/MsgTh";
import * as Utils from '../components/Utils';
import Preloader from "../components/Preloader";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
    }, []);
    return (
        <>
            {isLoading && <Preloader />}
            {!isLoading &&
                <BackOffice title={_msg.menu_home}>
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>150</h3>
                                    <p>New Orders</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag" />
                                </div>
                                <a href="#" className="small-box-footer">
                                    More info <i className="fas fa-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>
                                        53<sup style={{ fontSize: 20 }}>%</sup>
                                    </h3>
                                    <p>Bounce Rate</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-stats-bars" />
                                </div>
                                <a href="#" className="small-box-footer">
                                    More info <i className="fas fa-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>44</h3>
                                    <p>User Registrations</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add" />
                                </div>
                                <a href="#" className="small-box-footer">
                                    More info <i className="fas fa-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>65</h3>
                                    <p>Unique Visitors</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph" />
                                </div>
                                <a href="#" className="small-box-footer">
                                    More info <i className="fas fa-arrow-circle-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div
                                    className="card-header border-0 ui-sortable-handle"
                                    style={{ cursor: "move" }}
                                >
                                    <h3 className="card-title">
                                        <i className="far fa-calendar-alt" />
                                        Calendar
                                    </h3>
                                    <div className="card-tools">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-default btn-sm dropdown-toggle"
                                                data-toggle="dropdown"
                                                data-offset={-52}
                                            >
                                                <i className="fas fa-bars" />
                                            </button>
                                            <div className="dropdown-menu" role="menu">
                                                <a href="#" className="dropdown-item">
                                                    Add new event
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    Clear events
                                                </a>
                                                <div className="dropdown-divider" />
                                                <a href="#" className="dropdown-item">
                                                    View calendar
                                                </a>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-default btn-sm"
                                            data-card-widget="collapse"
                                        >
                                            <i className="fas fa-minus" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-default btn-sm"
                                            data-card-widget="remove"
                                        >
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div id="calendar" style={{ width: "100%" }}>
                                        <div className="bootstrap-datetimepicker-widget usetwentyfour">
                                            <ul className="list-unstyled">
                                                <li className="show">
                                                    <div className="datepicker">
                                                        <div className="datepicker-days" style={{}}>
                                                            <table className="table table-sm">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="prev" data-action="previous">
                                                                            <span
                                                                                className="fa fa-chevron-left"
                                                                                title="Previous Month"
                                                                            />
                                                                        </th>
                                                                        <th
                                                                            className="picker-switch"
                                                                            data-action="pickerSwitch"
                                                                            colSpan={5}
                                                                            title="Select Month"
                                                                        >
                                                                            June 2024
                                                                        </th>
                                                                        <th className="next" data-action="next">
                                                                            <span
                                                                                className="fa fa-chevron-right"
                                                                                title="Next Month"
                                                                            />
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="dow">Su</th>
                                                                        <th className="dow">Mo</th>
                                                                        <th className="dow">Tu</th>
                                                                        <th className="dow">We</th>
                                                                        <th className="dow">Th</th>
                                                                        <th className="dow">Fr</th>
                                                                        <th className="dow">Sa</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="05/26/2024"
                                                                            className="day old weekend"
                                                                        >
                                                                            26
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="05/27/2024"
                                                                            className="day old"
                                                                        >
                                                                            27
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="05/28/2024"
                                                                            className="day old"
                                                                        >
                                                                            28
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="05/29/2024"
                                                                            className="day old"
                                                                        >
                                                                            29
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="05/30/2024"
                                                                            className="day old"
                                                                        >
                                                                            30
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="05/31/2024"
                                                                            className="day old"
                                                                        >
                                                                            31
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/01/2024"
                                                                            className="day weekend"
                                                                        >
                                                                            1
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/02/2024"
                                                                            className="day active today weekend"
                                                                        >
                                                                            2
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/03/2024"
                                                                            className="day"
                                                                        >
                                                                            3
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/04/2024"
                                                                            className="day"
                                                                        >
                                                                            4
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/05/2024"
                                                                            className="day"
                                                                        >
                                                                            5
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/06/2024"
                                                                            className="day"
                                                                        >
                                                                            6
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/07/2024"
                                                                            className="day"
                                                                        >
                                                                            7
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/08/2024"
                                                                            className="day weekend"
                                                                        >
                                                                            8
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/09/2024"
                                                                            className="day weekend"
                                                                        >
                                                                            9
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/10/2024"
                                                                            className="day"
                                                                        >
                                                                            10
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/11/2024"
                                                                            className="day"
                                                                        >
                                                                            11
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/12/2024"
                                                                            className="day"
                                                                        >
                                                                            12
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/13/2024"
                                                                            className="day"
                                                                        >
                                                                            13
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/14/2024"
                                                                            className="day"
                                                                        >
                                                                            14
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/15/2024"
                                                                            className="day weekend"
                                                                        >
                                                                            15
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/16/2024"
                                                                            className="day weekend"
                                                                        >
                                                                            16
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/17/2024"
                                                                            className="day"
                                                                        >
                                                                            17
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/18/2024"
                                                                            className="day"
                                                                        >
                                                                            18
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/19/2024"
                                                                            className="day"
                                                                        >
                                                                            19
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/20/2024"
                                                                            className="day"
                                                                        >
                                                                            20
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/21/2024"
                                                                            className="day"
                                                                        >
                                                                            21
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/22/2024"
                                                                            className="day weekend"
                                                                        >
                                                                            22
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/23/2024"
                                                                            className="day weekend"
                                                                        >
                                                                            23
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/24/2024"
                                                                            className="day"
                                                                        >
                                                                            24
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/25/2024"
                                                                            className="day"
                                                                        >
                                                                            25
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/26/2024"
                                                                            className="day"
                                                                        >
                                                                            26
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/27/2024"
                                                                            className="day"
                                                                        >
                                                                            27
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/28/2024"
                                                                            className="day"
                                                                        >
                                                                            28
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/29/2024"
                                                                            className="day weekend"
                                                                        >
                                                                            29
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="06/30/2024"
                                                                            className="day weekend"
                                                                        >
                                                                            30
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="07/01/2024"
                                                                            className="day new"
                                                                        >
                                                                            1
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="07/02/2024"
                                                                            className="day new"
                                                                        >
                                                                            2
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="07/03/2024"
                                                                            className="day new"
                                                                        >
                                                                            3
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="07/04/2024"
                                                                            className="day new"
                                                                        >
                                                                            4
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="07/05/2024"
                                                                            className="day new"
                                                                        >
                                                                            5
                                                                        </td>
                                                                        <td
                                                                            data-action="selectDay"
                                                                            data-day="07/06/2024"
                                                                            className="day new weekend"
                                                                        >
                                                                            6
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="datepicker-months" style={{ display: "none" }}>
                                                            <table className="table-condensed">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="prev" data-action="previous">
                                                                            <span
                                                                                className="fa fa-chevron-left"
                                                                                title="Previous Year"
                                                                            />
                                                                        </th>
                                                                        <th
                                                                            className="picker-switch"
                                                                            data-action="pickerSwitch"
                                                                            colSpan={5}
                                                                            title="Select Year"
                                                                        >
                                                                            2024
                                                                        </th>
                                                                        <th className="next" data-action="next">
                                                                            <span
                                                                                className="fa fa-chevron-right"
                                                                                title="Next Year"
                                                                            />
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td colSpan={7}>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Jan
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Feb
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Mar
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Apr
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                May
                                                                            </span>
                                                                            <span
                                                                                data-action="selectMonth"
                                                                                className="month active"
                                                                            >
                                                                                Jun
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Jul
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Aug
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Sep
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Oct
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Nov
                                                                            </span>
                                                                            <span data-action="selectMonth" className="month">
                                                                                Dec
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="datepicker-years" style={{ display: "none" }}>
                                                            <table className="table-condensed">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="prev" data-action="previous">
                                                                            <span
                                                                                className="fa fa-chevron-left"
                                                                                title="Previous Decade"
                                                                            />
                                                                        </th>
                                                                        <th
                                                                            className="picker-switch"
                                                                            data-action="pickerSwitch"
                                                                            colSpan={5}
                                                                            title="Select Decade"
                                                                        >
                                                                            2020-2029
                                                                        </th>
                                                                        <th className="next" data-action="next">
                                                                            <span
                                                                                className="fa fa-chevron-right"
                                                                                title="Next Decade"
                                                                            />
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td colSpan={7}>
                                                                            <span data-action="selectYear" className="year old">
                                                                                2019
                                                                            </span>
                                                                            <span data-action="selectYear" className="year">
                                                                                2020
                                                                            </span>
                                                                            <span data-action="selectYear" className="year">
                                                                                2021
                                                                            </span>
                                                                            <span data-action="selectYear" className="year">
                                                                                2022
                                                                            </span>
                                                                            <span data-action="selectYear" className="year">
                                                                                2023
                                                                            </span>
                                                                            <span data-action="selectYear" className="year active">
                                                                                2024
                                                                            </span>
                                                                            <span data-action="selectYear" className="year">
                                                                                2025
                                                                            </span>
                                                                            <span data-action="selectYear" className="year">
                                                                                2026
                                                                            </span>
                                                                            <span data-action="selectYear" className="year">
                                                                                2027
                                                                            </span>
                                                                            <span data-action="selectYear" className="year">
                                                                                2028
                                                                            </span>
                                                                            <span data-action="selectYear" className="year">
                                                                                2029
                                                                            </span>
                                                                            <span data-action="selectYear" className="year old">
                                                                                2030
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="datepicker-decades" style={{ display: "none" }}>
                                                            <table className="table-condensed">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="prev" data-action="previous">
                                                                            <span
                                                                                className="fa fa-chevron-left"
                                                                                title="Previous Century"
                                                                            />
                                                                        </th>
                                                                        <th
                                                                            className="picker-switch"
                                                                            data-action="pickerSwitch"
                                                                            colSpan={5}
                                                                        >
                                                                            2000-2090
                                                                        </th>
                                                                        <th className="next" data-action="next">
                                                                            <span
                                                                                className="fa fa-chevron-right"
                                                                                title="Next Century"
                                                                            />
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td colSpan={7}>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade old"
                                                                                data-selection={2006}
                                                                            >
                                                                                1990
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade"
                                                                                data-selection={2006}
                                                                            >
                                                                                2000
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade"
                                                                                data-selection={2016}
                                                                            >
                                                                                2010
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade active"
                                                                                data-selection={2026}
                                                                            >
                                                                                2020
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade"
                                                                                data-selection={2036}
                                                                            >
                                                                                2030
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade"
                                                                                data-selection={2046}
                                                                            >
                                                                                2040
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade"
                                                                                data-selection={2056}
                                                                            >
                                                                                2050
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade"
                                                                                data-selection={2066}
                                                                            >
                                                                                2060
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade"
                                                                                data-selection={2076}
                                                                            >
                                                                                2070
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade"
                                                                                data-selection={2086}
                                                                            >
                                                                                2080
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade"
                                                                                data-selection={2096}
                                                                            >
                                                                                2090
                                                                            </span>
                                                                            <span
                                                                                data-action="selectDecade"
                                                                                className="decade old"
                                                                                data-selection={2106}
                                                                            >
                                                                                2100
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="picker-switch accordion-toggle" />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </BackOffice>
            }
        </>
    )
}

export default Home