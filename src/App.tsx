import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user"); // "admin" hoặc "user"
  const [userName, setUserName] = useState("Người dùng");

  // Form states (giả lập)
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Xử lý đăng nhập giả lập
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Đăng nhập test: nếu email chứa admin => admin, ngược lại user
    setUserRole(loginEmail.includes("admin") ? "admin" : "user");
    setUserName(loginEmail.includes("admin") ? "Quản trị viên" : "Người dùng");
    setIsLoggedIn(true);
    setDialogOpen(false);
  }
  // Đăng xuất
  function handleLogout() {
    setIsLoggedIn(false);
    setUserRole("user");
    setUserName("Người dùng");
  }
  // Xử lý đăng ký giả lập
  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setUserRole(registerEmail.includes("admin") ? "admin" : "user");
    setUserName(registerName || "Người dùng");
    setIsLoggedIn(true);
    setDialogOpen(false);
  }
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-[#1d2e6b] font-sans">
      {/* Header */}
      <header className="flex items-center justify-between py-4 px-6 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#30b54f] rounded-xl p-2 text-white font-bold text-xl select-none">💰</div>
          <span className="text-2xl font-semibold tracking-tight">Quản Lí Tài Chính</span>
        </div>
        <nav className="hidden md:flex gap-8 text-base font-medium text-[#1d2e6b]">
          <a href="#about" className="hover:text-[#30b54f] transition">Giới thiệu</a>
          <a href="#features" className="hover:text-[#30b54f] transition">Chức năng</a>
          <a href="#settings" className="hover:text-[#30b54f] transition">Cài đặt</a>
          {isLoggedIn && userRole === "admin" && (
            <a href="#admin" className="hover:text-[#d25751] transition">Admin</a>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Đăng nhập</Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-[380px]">
                <DialogHeader>
                  <DialogTitle>Đăng nhập / Đăng ký</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full mt-4">
                  <TabsList className="w-full grid grid-cols-2 mb-4">
                    <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                    <TabsTrigger value="register">Đăng ký</TabsTrigger>
                  </TabsList>
                  {/* Đăng nhập */}
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="flex flex-col gap-3">
                      <Input
                        placeholder="Email"
                        type="email"
                        required
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                      />
                      <Input
                        placeholder="Mật khẩu"
                        type="password"
                        required
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                      />
                      <Button type="submit" className="mt-2 bg-[#30b54f] text-white">Đăng nhập</Button>
                    </form>
                  </TabsContent>
                  {/* Đăng ký */}
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="flex flex-col gap-3">
                      <Input
                        placeholder="Tên hiển thị (tuỳ chọn)"
                        type="text"
                        value={registerName}
                        onChange={e => setRegisterName(e.target.value)}
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        required
                        value={registerEmail}
                        onChange={e => setRegisterEmail(e.target.value)}
                      />
                      <Input
                        placeholder="Mật khẩu"
                        type="password"
                        required
                        value={registerPassword}
                        onChange={e => setRegisterPassword(e.target.value)}
                      />
                      <Input
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        required
                        value={registerConfirm}
                        onChange={e => setRegisterConfirm(e.target.value)}
                      />
                      <Button type="submit" className="mt-2 bg-[#30b54f] text-white">Đăng ký</Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex items-center gap-2">
              <Avatar>
                <div className="bg-[#30b54f] rounded-full h-8 w-8 flex items-center justify-center text-white font-semibold">{userName[0]}</div>
              </Avatar>
              <span className="font-medium text-[#1d2e6b]">{userName}</span>
              <Button variant="ghost" onClick={handleLogout} className="ml-2">Đăng xuất</Button>
            </div>
          )}
        </div>
        <button className="md:hidden p-2 text-[#1d2e6b]">☰</button>
      </header>
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center pt-14 pb-10 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold mb-3 leading-tight">
          Cách <span className="text-[#30b54f]">đơn giản</span> để <br className="hidden md:block" />
          quản lý <span className="text-[#30b54f]">tài chính cá nhân</span>
        </h1>
        <p className="text-lg md:text-xl text-[#97a09c] mb-6">
          Kiểm soát chi tiêu, lập kế hoạch tài chính, và hướng tới mục tiêu tiết kiệm dễ dàng ngay hôm nay.
        </p>
        <Button className="bg-[#30b54f] hover:bg-[#26933f] px-10 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition">
          Trải nghiệm ngay
        </Button>
        <div className="flex gap-6 justify-center mt-8 text-gray-700 text-base flex-wrap">
          <span>100% bảo mật dữ liệu</span>
          <span>App tài chính top đầu</span>
        </div>
      </section>
    </div>
  );
}
