// import components
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

const LoginPage = () => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Welcome back!</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Button variant="link">
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    <img
                        src="/image/google.svg"
                        alt="Google"
                        className="size-4 mr-2"
                    />
                    Login with Google
                </Button>
                <Button variant="outline" className="w-full">
                    <img
                        src="/image/github.svg"
                        alt="GitHub"
                        className="size-4 mr-2"
                    />
                    Login with GitHub
                </Button>
            </CardFooter>
        </Card>
    );
};

export default LoginPage;
