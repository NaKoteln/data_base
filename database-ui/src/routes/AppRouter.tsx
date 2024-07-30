import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import BaseLayout from "../layouts/BaseLayout";

import HotelsPage from "../features/hotels/pages/HotelsPage";
import FlightsPage from "../features/flights/pages/FlightsPage";
import AgenciesPage from "../features/agencies/pages/AgenciesPage";
import ItemsPage from "../features/warehouseItems/pages/ItemsPage";
import ExcursionsPage from "../features/excursions/pages/ExcursionsPage";
import ExcursionSchedulesPage from "../features/excursionShedules/pages/SchedulesPage";
import PeoplesPage from "../features/peoples/pages/PeoplesPage";
import CountriesPage from "../features/countries/pages/CountriesPage";
import GroupsPage from "../features/touristGroups/pages/GroupsPage";
import TouristsPage from "../features/tourists/pages/TouristsPage";
import BookingsPage from "../features/hotelBookings/pages/BookingsPage";
import RecordsPage from "../features/excursionBookingRecords/pages/RecordsPage";
import FeedbacksPage from "../features/feedbacks/pages/FeedbacksPage";
import FlightSchedulesPage from "../features/flightsSchedules/pages/FlightsSchedulesPage";
import VisasPage from "../features/visas/pages/VisasPage";
import DocumentsPage from "../features/visaDocuments/pages/DocumentsPage";
import PurchasesPage from "../features/purchases/pages/PurchasesPage";
import ServicesPage from "../features/services/pages/ServicesPage";
import TServicesPage from "../features/touristServises/pages/TServicesPage";

import Report1Page from "../features/analytics/report1/pages/ReportPage";
import Report2Page from "../features/analytics/report2/pages/ReportPage";
import Report3Page from "../features/analytics/report3/pages/ReportPage";
import Report4Page from "../features/analytics/report4/pages/ReportPage";
import Report5Page from "../features/analytics/report5/pages/ReportPage";
import Report6Page from "../features/analytics/report6/pages/ReportPage";
import Report7Page from "../features/analytics/report7/pages/ReportPage";
import Report8Page from "../features/analytics/report8/pages/ReportPage";
import Report9Page from "../features/analytics/report9/pages/ReportPage";
import Report10Page from "../features/analytics/report10/pages/ReportPage";
import Report11Page from "../features/analytics/report11/pages/ReportPage";
import Report12Page from "../features/analytics/report12/pages/ReportPage";
import Report13Page from "../features/analytics/report13/pages/ReportPage";
import Report14Page from "../features/analytics/report14/pages/ReportPage";
import Report15Page from "../features/analytics/report15/pages/ReportPage";
import QueryPage from "../features/query/pages/QueryPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route path="*" element={<Navigate to="/peoples" replace={true} />} />
          {pagesTable.map((x) => (
            <Route key={x.path} path={x.path} element={x.page} />
          ))}
          {pagesReport.map((x) => (
            <Route key={x.path} path={x.path} element={x.page} />
          ))}
          <Route path={"query"} element={<QueryPage />} />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
}

export const pagesTable = [
  {
    path: "peoples",
    title: "Peoples",
    page: <PeoplesPage />,
  },
  {
    path: "countries",
    title: "Countries",
    page: <CountriesPage />,
  },
  {
    path: "tourist-grours",
    title: "Tourist grours",
    page: <GroupsPage />,
  },
  {
    path: "tourists",
    title: "Tourists",
    page: <TouristsPage />,
  },
  {
    path: "visas",
    title: "Visas",
    page: <VisasPage />,
  },
  {
    path: "visas-documents",
    title: "Visas documents",
    page: <DocumentsPage />,
  },
  {
    path: "hotels",
    title: "Hotels",
    page: <HotelsPage />,
  },
  {
    path: "hotels-booking",
    title: "Hotels Booking",
    page: <BookingsPage />,
  },
  {
    path: "flights",
    title: "Flights",
    page: <FlightsPage />,
  },
  {
    path: "flights-schedule",
    title: "Flights schedule",
    page: <FlightSchedulesPage />,
  },
  {
    path: "agencies",
    title: "Agencies",
    page: <AgenciesPage />,
  },
  {
    path: "excursions",
    title: "Excursions",
    page: <ExcursionsPage />,
  },
  {
    path: "feedbacks-about-excursions",
    title: "Feedbacks about excursions",
    page: <FeedbacksPage />,
  },
  {
    path: "excursions-schedule",
    title: "Excursions schedule",
    page: <ExcursionSchedulesPage />,
  },
  {
    path: "excursions-booking-records",
    title: "Excursions booking records",
    page: <RecordsPage />,
  },
  {
    path: "warehouse-items",
    title: "Warehouse items",
    page: <ItemsPage />,
  },
  {
    path: "purchases",
    title: "Purchases",
    page: <PurchasesPage />,
  },
  {
    path: "services",
    title: "Services",
    page: <ServicesPage />,
  },
  {
    path: "tourist-services",
    title: "Tourist services",
    page: <TServicesPage />,
  },
];

export const pagesReport = [
  {
    path: "report1",
    title: "Report1",
    page: <Report1Page />,
  },
  {
    path: "report2",
    title: "Report2",
    page: <Report2Page />,
  },
  {
    path: "report3",
    title: "Report3",
    page: <Report3Page />,
  },
  {
    path: "report4",
    title: "Report4",
    page: <Report4Page />,
  },
  {
    path: "report5",
    title: "Report5",
    page: <Report5Page />,
  },
  {
    path: "report6",
    title: "Report6",
    page: <Report6Page />,
  },
  {
    path: "report7",
    title: "Report7",
    page: <Report7Page />,
  },
  {
    path: "report8",
    title: "Report8",
    page: <Report8Page />,
  },
  {
    path: "report9",
    title: "Report9",
    page: <Report9Page />,
  },
  {
    path: "report10",
    title: "Report10",
    page: <Report10Page />,
  },
  {
    path: "report11",
    title: "Report11",
    page: <Report11Page />,
  },
  {
    path: "report12",
    title: "Report12",
    page: <Report12Page />,
  },
  {
    path: "report13",
    title: "Report13",
    page: <Report13Page />,
  },
  {
    path: "report14",
    title: "Report14",
    page: <Report14Page />,
  },
  {
    path: "report15",
    title: "Report15",
    page: <Report15Page />,
  },
];

export default AppRouter;
