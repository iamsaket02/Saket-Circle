import { Route, Routes, Navigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import Homepage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnboardingPage";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader";
import userAuthUser from "./hooks/userAuthUser";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";
import SearchPage from "./pages/SearchPage";

const AppContent = () => {
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 50,
      scale: 0.95,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  const PageWrapper = ({ children }) => (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );

  const { theme } = useThemeStore();

  const { isLoading, authUser } = userAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-full" data-theme={theme}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                {isAuthenticated && isOnboarded ? (
                  <Layout showSideBar>
                    <Homepage />
                  </Layout>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <PageWrapper>
                {!isAuthenticated ? (
                  <SignUpPage />
                ) : (
                  <Navigate to={isOnboarded ? "/" : "/onboarding"} />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                {!isAuthenticated ? (
                  <LoginPage />
                ) : (
                  <Navigate to={isOnboarded ? "/" : "/onboarding"} />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/notifications"
            element={
              <PageWrapper>
                {isAuthenticated && isOnboarded ? (
                  <Layout showSideBar>
                    <NotificationsPage />
                  </Layout>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/call/:id"
            element={
              <PageWrapper>
                {isAuthenticated && isOnboarded ? (
                  <Layout showSideBar={false}>
                    <CallPage />
                  </Layout>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <PageWrapper>
                {isAuthenticated && isOnboarded ? (
                  <Layout showSideBar={false}>
                    <ChatPage />
                  </Layout>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/onboarding"
            element={
              <PageWrapper>
                {isAuthenticated ? (
                  !isOnboarded ? (
                    <OnboardingPage />
                  ) : (
                    <Navigate to="/" />
                  )
                ) : (
                  <Navigate to="/login" />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/search"
            element={
              <PageWrapper>
                {isAuthenticated && isOnboarded ? (
                  <Layout showSideBar>
                    <SearchPage />
                  </Layout>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )}
              </PageWrapper>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PageWrapper>
                {isAuthenticated && isOnboarded ? (
                  <Layout showSideBar>
                    <OnboardingPage fromEditProfile />
                  </Layout>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )}
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </div>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
