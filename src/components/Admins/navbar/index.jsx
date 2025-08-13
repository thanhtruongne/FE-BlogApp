import { Badge, Skeleton } from 'antd';
import { HttpStatusCode } from "axios";
import { useContext, useEffect, useState } from "react";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import {
  IoMdNotificationsOutline
} from "react-icons/io";
import { Link } from "react-router-dom";
import General from "../../../apis/admin/General";
import { NotifyContext } from '../../../contexts/NotifyContext';
import showMessage from "../../../Helpers/showMessage";
import { socket } from "../../../services/sockets/socket";
import Dropdown from '../dropdown/index';
import Notifications from './notifications';


const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [notifications, setNotifications] = useState([]);
  const [params, setParams] = useState({});
  const [loadingNotify, setLoadingNotify] = useState(false)
  const { countNotify, setNotify } = useContext(NotifyContext)



  useEffect(() => {
    socket.on('notify_admin', (payload) => {
      console.log(payload, 'socket')
      let count = 0;
      setNotifications((prev) => {
        const dataEx = [...prev, payload];
        dataEx.map(item => {
          if (!item.markAread) {
            count++;
          }
        })
        setNotify(count)
        return dataEx;
      });

    });

    if (notifications) {
      handleNotifications()
    }
    return () => {
      socket.off('notify_admin');
    };


  }, []);

  const handleNotifications = async () => {
    setLoadingNotify(true)
    try {
      await General.getNotifications(params)
        .then((res) => {
          if (res.status == HttpStatusCode.Ok) {
            let count = 0;
            setNotifications(res.data)
            res.data.map(item => {
              if (!item.markAread) {
                count++;
              }
            })
            setNotify(count)
          }
        })
        .catch(error => {
          showMessage(error.message, 'error')
        })

    } catch (error) {
      console.log(error)
    }
    setLoadingNotify(false)
  }
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            class="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        {/* start Notification */}
        <Dropdown
          button={
            <Badge count={countNotify}>
              <p className="cursor-pointer relative">
                <IoMdNotificationsOutline className="h-7 w-7 text-gray-600 dark:text-white" />
              </p>
            </Badge>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          children={
            <div className="flex w-[500px] overflow-y-auto max-h-[400px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-navy-700 dark:text-white">
                  Thông báo
                </p>
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  Mark all read
                </p>
              </div>
              {loadingNotify ? (
                Array(notifications?.length ?? 6).fill(null).map((item, key) => {
                  return <Skeleton active paragraph={{ rows: 2 }}></Skeleton>
                })
              ) : (
                <div className="">
                  {notifications && notifications?.length > 0 ? <Notifications data={notifications} /> : <span>Chưa có thông báo.</span>}
                </div>
              )}

            </div>
          }
          classNames={"py-2 top-4 -left-[230px] md:-left-[473px] w-max"}
        />

        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={''}
              alt="Elon Musk"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, Adela
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <a
                  href=" "
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Newsletter Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in"
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
