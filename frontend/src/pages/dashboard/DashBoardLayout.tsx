import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';


const DashBoardLayout = () => {

    return (
        <section className="flex md:bg-gray-100 min-h-screen
            overflow-hidden"
        >
            {/* Sidebar */}
            <AdminSidebar />
            {/* header */}
            <AdminHeader />
      </section>
  )
}

export default DashBoardLayout
