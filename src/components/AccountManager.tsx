import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const AccountManager = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  let userConfig;

  if (user) {
    const userId = user.id;
    const userEmail = user.email;
    const userFirstName = user.given_name;
    const userLastName = user.family_name;

    userConfig = await db.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!userConfig) {
      await db.user.create({
        data: {
          userId: userId,
          email: userEmail,
          firstName: userFirstName,
          lastName: userLastName,
        },
      });
    }
  }

  return (
    <div className="flex flex-col gap-2 md:pb-5">
      {user ? (
        <>
          <p className="text-zinc-300">
            Now logged in as {userConfig?.firstName} {userConfig?.lastName}
          </p>
          <div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-10 md:pb-5">
              <Link
                href="/api/auth/logout"
                className={buttonVariants({
                  size: "lg",
                  variant: "default",
                  className:
                    "py-8 w-40 bg-teal-700 hover:bg-teal-700/80 duration-500 text-xl font-semibold shadow-md shadow-teal-900",
                })}
              >
                Logout
              </Link>
              <Link
                href="/sync"
                className={buttonVariants({
                  size: "lg",
                  variant: "default",
                  className:
                    "py-8 w-40 bg-teal-700 hover:bg-teal-700/80 duration-500 text-xl font-semibold shadow-md shadow-teal-900",
                })}
              >
                Profile
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-10 md:pb-5">
            <Link
              href="/api/auth/login"
              className={buttonVariants({
                size: "lg",
                variant: "default",
                className:
                  "py-8 w-40 bg-teal-700 hover:bg-teal-700/80 duration-500 text-xl font-semibold shadow-md shadow-teal-900",
              })}
            >
              Login
            </Link>
            <Link
              href="/api/auth/register"
              className={buttonVariants({
                size: "lg",
                variant: "default",
                className:
                  "py-8 w-40 bg-teal-700 hover:bg-teal-700/80 duration-500 text-xl font-semibold shadow-md shadow-teal-900",
              })}
            >
              Sign up
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountManager;
