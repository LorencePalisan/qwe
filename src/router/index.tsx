import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout       from "@/layouts/RootLayout";
import AuthLayout       from "@/layouts/AuthLayout";
import PersonalLayout   from "@/layouts/PersonalLayout";
import BusinessLayout   from "@/layouts/BusinessLayout";
import FreelanceLayout  from "@/layouts/FreelanceLayout";
import CommunityLayout  from "@/layouts/CommunityLayout";
import OrganizerLayout  from "@/layouts/OrganizerLayout";
import AgencyLayout     from "@/layouts/AgencyLayout";
import Login            from "@/pages/Login";
import Register         from "@/pages/Register";
import ForgotPassword   from "@/pages/ForgotPassword";
import ResetPassword    from "@/pages/ResetPassword";
import Dashboard        from "@/pages/Dashboard";
import NotFound         from "@/pages/NotFound";

// Personal pages
import PersonalHome           from "@/pages/personal/Home";
import PersonalProfile        from "@/pages/personal/Profile";
import PersonalAccounts       from "@/pages/personal/Accounts";
import PersonalActivity       from "@/pages/personal/Activity";
import PersonalConnections    from "@/pages/personal/Connections";
import PersonalCommunity      from "@/pages/personal/Community";
import PersonalBusiness       from "@/pages/personal/Business";
import PersonalBizRewards     from "@/pages/personal/BusinessRewards";
import PersonalFreelance      from "@/pages/personal/Freelance";
import PersonalFreelanceDetail from "@/pages/personal/FreelanceDetail";
import PersonalBusinessDetail  from "@/pages/personal/BusinessDetail";
import PersonalAgencies       from "@/pages/personal/Agencies";
import PersonalEvents         from "@/pages/personal/Events";
import PersonalSubscription   from "@/pages/personal/Subscription";
import PersonalMembership     from "@/pages/personal/Membership";
import PersonalNotification   from "@/pages/personal/Notification";
import PersonalGames          from "@/pages/personal/Games";

// Business pages
import BusinessHome          from "@/pages/business/Home";
import BusinessServices      from "@/pages/business/Services";
import BusinessBrands        from "@/pages/business/Brands";
import BusinessEvents        from "@/pages/business/Events";
import BusinessSubscribers   from "@/pages/business/Subscribers";
import BusinessInquiries     from "@/pages/business/Inquiries";
import BusinessNotifications from "@/pages/business/Notifications";
import BusinessHistory       from "@/pages/business/History";
import BusinessTeam          from "@/pages/business/Team";
import BusinessWorkspace     from "@/pages/business/Workspace";
import BusinessSettings      from "@/pages/business/Settings";

// Freelance pages
import FreelanceHome      from "@/pages/freelance/Home";
import FreelanceServices  from "@/pages/freelance/Services";
import FreelanceClients   from "@/pages/freelance/Clients";
import FreelanceCalendar  from "@/pages/freelance/Calendar";
import FreelancePortfolio from "@/pages/freelance/Portfolio";
import FreelanceInquiries from "@/pages/freelance/Inquiries";

// Organizer pages
import OrganizerHome      from "@/pages/organizer/Home";
import OrganizerEvents    from "@/pages/organizer/Events";
import OrganizerVendors   from "@/pages/organizer/Vendors";
import OrganizerServices  from "@/pages/organizer/Services";
import OrganizerTeam      from "@/pages/organizer/Team";
import OrganizerInquiries from "@/pages/organizer/Inquiries";
import OrganizerSettings  from "@/pages/organizer/Settings";

// Agency pages
import AgencyHome      from "@/pages/agency/Home";
import AgencyClients   from "@/pages/agency/Clients";
import AgencyServices  from "@/pages/agency/Services";
import AgencyTeam      from "@/pages/agency/Team";
import AgencyInquiries from "@/pages/agency/Inquiries";
import AgencySettings  from "@/pages/agency/Settings";

// Community pages
import CommunityHome         from "@/pages/community/Home";
import CommunityMembers      from "@/pages/community/Members";
import CommunityChapters     from "@/pages/community/Chapters";
import CommunityEvents       from "@/pages/community/Events";
import CommunityMessageBoard from "@/pages/community/MessageBoard";
import CommunityInquiries    from "@/pages/community/Inquiries";
import CommunityDirectory    from "@/pages/community/Directory";
import CommunityHistory      from "@/pages/community/History";
import CommunityServices     from "@/pages/community/Services";
import CommunitySettings     from "@/pages/community/Settings";

export const router = createBrowserRouter([
  // ── Auth routes ─────────────────────────────────────────────────────────────
  {
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/",                element: <Login />          },
      { path: "/register",        element: <Register />       },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password",  element: <ResetPassword />  },
    ],
  },

  // ── Personal routes ──────────────────────────────────────────────────────────
  {
    path: "/personal",
    element: <PersonalLayout />,
    children: [
      { index: true,                      element: <PersonalHome />          },
      { path: "profile",                  element: <PersonalProfile />       },
      { path: "accounts",                 element: <PersonalAccounts />      },
      { path: "activity",                 element: <PersonalActivity />      },
      { path: "connections",              element: <PersonalConnections />   },
      { path: "community",                element: <PersonalCommunity />     },
      { path: "business",                 element: <PersonalBusiness />      },
      { path: "business/my-rewards",      element: <PersonalBizRewards />    },
      { path: "business/:businessId",     element: <PersonalBusinessDetail />},
      { path: "freelance",                element: <PersonalFreelance />     },
      { path: "freelance/preview",        element: <PersonalFreelance />     },
      { path: "freelance/:freelancerId",  element: <PersonalFreelanceDetail />},
      { path: "agencies",                 element: <PersonalAgencies />      },
      { path: "agency/preview",           element: <PersonalAgencies />      },
      { path: "events",                   element: <Navigate to="/personal/events/my-events" replace /> },
      { path: "events/my-events",         element: <PersonalEvents />        },
      { path: "events/registrations",     element: <PersonalEvents />        },
      { path: "subscription",             element: <PersonalSubscription />  },
      { path: "membership",               element: <PersonalMembership />    },
      { path: "notification",             element: <PersonalNotification />  },
      { path: "games",                    element: <PersonalGames />         },
    ],
  },

  // ── Business routes ──────────────────────────────────────────────────────────
  {
    path: "/business",
    element: <BusinessLayout />,
    children: [
      { index: true,          element: <BusinessHome />          },
      { path: "services",     element: <BusinessServices />      },
      { path: "brands",       element: <BusinessBrands />        },
      { path: "events",       element: <BusinessEvents />        },
      { path: "subscribers",  element: <BusinessSubscribers />   },
      { path: "inquiries",    element: <BusinessInquiries />     },
      { path: "notifications",element: <BusinessNotifications /> },
      { path: "history",      element: <BusinessHistory />       },
      { path: "team",         element: <BusinessTeam />          },
      { path: "workspace",    element: <BusinessWorkspace />     },
      { path: "settings",     element: <BusinessSettings />      },
    ],
  },

  // ── Freelance routes ─────────────────────────────────────────────────────────
  {
    path: "/freelance",
    element: <FreelanceLayout />,
    children: [
      { index: true,      element: <FreelanceHome />      },
      { path: "services", element: <FreelanceServices />  },
      { path: "clients",  element: <FreelanceClients />   },
      { path: "calendar", element: <FreelanceCalendar />  },
      { path: "portfolio",element: <FreelancePortfolio /> },
      { path: "inquiries",element: <FreelanceInquiries /> },
    ],
  },

  // ── Community routes ─────────────────────────────────────────────────────────
  {
    path: "/community",
    element: <CommunityLayout />,
    children: [
      { index: true,            element: <CommunityHome />         },
      { path: "members",        element: <CommunityMembers />      },
      { path: "chapters",       element: <CommunityChapters />     },
      { path: "events",         element: <CommunityEvents />       },
      { path: "message-board",  element: <CommunityMessageBoard /> },
      { path: "inquiries",      element: <CommunityInquiries />    },
      { path: "directory",      element: <CommunityDirectory />    },
      { path: "history",        element: <CommunityHistory />      },
      { path: "services",       element: <CommunityServices />     },
      { path: "settings",       element: <CommunitySettings />     },
    ],
  },

  // ── Organizer routes ─────────────────────────────────────────────────────────
  {
    path: "/organizer",
    element: <OrganizerLayout />,
    children: [
      { index: true,        element: <OrganizerHome />      },
      { path: "events",     element: <OrganizerEvents />    },
      { path: "vendors",    element: <OrganizerVendors />   },
      { path: "services",   element: <OrganizerServices />  },
      { path: "team",       element: <OrganizerTeam />      },
      { path: "inquiries",  element: <OrganizerInquiries /> },
      { path: "settings",   element: <OrganizerSettings />  },
    ],
  },

  // ── Agency routes ─────────────────────────────────────────────────────────────
  {
    path: "/agency",
    element: <AgencyLayout />,
    children: [
      { index: true,        element: <AgencyHome />      },
      { path: "clients",    element: <AgencyClients />   },
      { path: "services",   element: <AgencyServices />  },
      { path: "team",       element: <AgencyTeam />      },
      { path: "inquiries",  element: <AgencyInquiries /> },
      { path: "settings",   element: <AgencySettings />  },
    ],
  },

  // ── Dashboard (legacy) ───────────────────────────────────────────────────────
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
]);
