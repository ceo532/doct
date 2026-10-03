/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  BookOpen,
  Sparkles,
  Check,
  AlertCircle,
  HelpCircle,
  GraduationCap
} from 'lucide-react';

interface Question {
  cau: number;
  hoi: string;
  A: string;
  B: string;
  C: string;
  D: string;
  dapAn: 'A' | 'B' | 'C' | 'D';
}

const QUESTIONS: Question[] = [
  {"cau":1,"hoi":"Thì Hiện tại đơn của động từ 'walk' (Tôi đi bộ mỗi ngày): I _______ every day.","A":"walk","B":"am walking","C":"walked","D":"was walking","dapAn":"A"},
  {"cau":2,"hoi":"Thì Hiện tại tiếp diễn của động từ 'walk' (Tôi đang đi bộ): I _______ right now.","A":"walk","B":"am walking","C":"walked","D":"was walking","dapAn":"B"},
  {"cau":3,"hoi":"Thì Quá khứ đơn của động từ 'walk' (Tôi đã đi bộ): I _______ yesterday.","A":"walk","B":"am walking","C":"walked","D":"was walking","dapAn":"C"},
  {"cau":4,"hoi":"Thì Quá khứ tiếp diễn của động từ 'walk' (Tôi đang đi bộ lúc đó): I _______ at 8 PM last night.","A":"walk","B":"am walking","C":"walked","D":"was walking","dapAn":"D"},
  {"cau":5,"hoi":"Thì Hiện tại đơn của động từ 'talk' (Tôi thường nói chuyện): I often _______ to him.","A":"talk","B":"am talking","C":"talked","D":"was talking","dapAn":"A"},
  {"cau":6,"hoi":"Thì Hiện tại tiếp diễn của động từ 'talk' (Tôi đang nói chuyện): I _______ to him now.","A":"talk","B":"am talking","C":"talked","D":"was talking","dapAn":"B"},
  {"cau":7,"hoi":"Thì Quá khứ đơn của động từ 'talk' (Tôi đã nói chuyện): I _______ to him yesterday.","A":"talk","B":"am talking","C":"talked","D":"was talking","dapAn":"C"},
  {"cau":8,"hoi":"Thì Quá khứ tiếp diễn của động từ 'talk' (Tôi đang nói chuyện lúc đó): I _______ to him at that time.","A":"talk","B":"am talking","C":"talked","D":"was talking","dapAn":"D"},
  {"cau":9,"hoi":"Thì Hiện tại đơn của động từ 'watch' (Tôi xem TV mỗi tối): I _______ TV every evening.","A":"watch","B":"am watching","C":"watched","D":"was watching","dapAn":"A"},
  {"cau":10,"hoi":"Thì Hiện tại tiếp diễn của động từ 'watch' (Tôi đang xem TV): I _______ TV at the moment.","A":"watch","B":"am watching","C":"watched","D":"was watching","dapAn":"B"},
  {"cau":11,"hoi":"Thì Quá khứ đơn của động từ 'watch' (Tôi đã xem TV): I _______ TV last night.","A":"watch","B":"am watching","C":"watched","D":"was watching","dapAn":"C"},
  {"cau":12,"hoi":"Thì Quá khứ tiếp diễn của động từ 'watch' (Tôi đang xem TV lúc đó): I _______ TV when he came.","A":"watch","B":"am watching","C":"watched","D":"was watching","dapAn":"D"},
  {"cau":13,"hoi":"Thì Hiện tại đơn của động từ 'listen' (Tôi nghe nhạc mỗi ngày): I _______ to music every day.","A":"listen","B":"am listening","C":"listened","D":"was listening","dapAn":"A"},
  {"cau":14,"hoi":"Thì Hiện tại tiếp diễn của động từ 'listen' (Tôi đang nghe nhạc): I _______ to music right now.","A":"listen","B":"am listening","C":"listened","D":"was listening","dapAn":"B"},
  {"cau":15,"hoi":"Thì Quá khứ đơn của động từ 'listen' (Tôi đã nghe nhạc): I _______ to music yesterday.","A":"listen","B":"am listening","C":"listened","D":"was listening","dapAn":"C"},
  {"cau":16,"hoi":"Thì Quá khứ tiếp diễn của động từ 'listen' (Tôi đang nghe nhạc lúc đó): I _______ to music at 8 PM yesterday.","A":"listen","B":"am listening","C":"listened","D":"was listening","dapAn":"D"},
  {"cau":17,"hoi":"Thì Hiện tại đơn của động từ 'learn' (Tôi học tiếng Anh): I _______ English.","A":"learn","B":"am learning","C":"learned","D":"was learning","dapAn":"A"},
  {"cau":18,"hoi":"Thì Hiện tại tiếp diễn của động từ 'learn' (Tôi đang học tiếng Anh): I _______ English now.","A":"learn","B":"am learning","C":"learned","D":"was learning","dapAn":"B"},
  {"cau":19,"hoi":"Thì Quá khứ đơn của động từ 'learn' (Tôi đã học tiếng Anh): I _______ English last year.","A":"learn","B":"am learning","C":"learned","D":"was learning","dapAn":"C"},
  {"cau":20,"hoi":"Thì Quá khứ tiếp diễn của động từ 'learn' (Tôi đang học tiếng Anh lúc đó): I _______ English when you called.","A":"learn","B":"am learning","C":"learned","D":"was learning","dapAn":"D"},
  {"cau":21,"hoi":"Thì Hiện tại đơn của động từ 'clean' (Tôi dọn dẹp phòng): I _______ my room every week.","A":"clean","B":"am cleaning","C":"cleaned","D":"was cleaning","dapAn":"A"},
  {"cau":22,"hoi":"Thì Hiện tại tiếp diễn của động từ 'clean' (Tôi đang dọn dẹp phòng): I _______ my room at the moment.","A":"clean","B":"am cleaning","C":"cleaned","D":"was cleaning","dapAn":"B"},
  {"cau":23,"hoi":"Thì Quá khứ đơn của động từ 'clean' (Tôi đã dọn dẹp phòng): I _______ my room yesterday.","A":"clean","B":"am cleaning","C":"cleaned","D":"was cleaning","dapAn":"C"},
  {"cau":24,"hoi":"Thì Quá khứ tiếp diễn của động từ 'clean' (Tôi đang dọn dẹp phòng lúc đó): I _______ my room when she arrived.","A":"clean","B":"am cleaning","C":"cleaned","D":"was cleaning","dapAn":"D"},
  {"cau":25,"hoi":"Thì Hiện tại đơn của động từ 'work' (Tôi làm việc ở đây): I _______ here.","A":"work","B":"am working","C":"worked","D":"was working","dapAn":"A"},
  {"cau":26,"hoi":"Thì Hiện tại tiếp diễn của động từ 'work' (Tôi đang làm việc): I _______ right now.","A":"work","B":"am working","C":"worked","D":"was working","dapAn":"B"},
  {"cau":27,"hoi":"Thì Hiện tại đơn của động từ 'be' (Tôi là một học sinh): I _______ a student.","A":"is","B":"am","C":"was","D":"were","dapAn":"B"},
  {"cau":28,"hoi":"Thì Quá khứ đơn của động từ 'be' (Tôi đã ở nhà hôm qua): I _______ at home yesterday.","A":"am","B":"was","C":"were","D":"have been","dapAn":"B"},
  {"cau":29,"hoi":"Thì Quá khứ đơn của động từ 'visit' (Tôi đã đến thăm bà): I _______ my grandmother last weekend.","A":"visit","B":"am visiting","C":"visited","D":"was visiting","dapAn":"C"},
  {"cau":30,"hoi":"Thì Quá khứ tiếp diễn của động từ 'play' (Tôi đang chơi game lúc đó): I _______ games when the phone rang.","A":"play","B":"am playing","C":"played","D":"was playing","dapAn":"D"}
];

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwR-qt3yItcs-NyP99caiZ2Fw83ScFVfGh-vsMaPr5GCPM7_TpkIaJI6yx3TB2GjuNPEQ/exec';

type Screen = 'start' | 'quiz' | 'result';
type AnswerOption = 'A' | 'B' | 'C' | 'D';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, AnswerOption>>({});
  const [resultFilter, setResultFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const webhookSentRef = useRef<boolean>(false);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const selectedAnswer = answers[currentQuestion?.cau];

  // Tính số câu đúng
  const correctCount = QUESTIONS.reduce((acc, q) => {
    return answers[q.cau] === q.dapAn ? acc + 1 : acc;
  }, 0);

  // Gửi webhook khi vào màn hình kết quả
  useEffect(() => {
    if (screen === 'result' && !webhookSentRef.current) {
      webhookSentRef.current = true;
      const sendResultToWebhook = async () => {
        try {
          const payload = {
            buoi: 'Tuần 4',
            loai: 'Ôn tập 4 thì (Hiện tại và Quá khứ) cho ngôi I',
            dung: correctCount,
            tong: 30,
            url: window.location.href,
          };

          // Gửi với header text/plain;charset=utf-8 để tránh preflight OPTIONS bị chặn bởi Google Apps Script
          await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload),
          });
          console.log('[Webhook] Kết quả đã được gửi thành công:', payload);
        } catch (error) {
          // Không hiển thị lỗi ra giao diện học sinh, chỉ log console theo yêu cầu
          console.error('[Webhook] Gửi kết quả thất bại (không ảnh hưởng hiển thị điểm):', error);
        }
      };

      sendResultToWebhook();
    }
  }, [screen, correctCount]);

  const handleStartQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowWarning(false);
    webhookSentRef.current = false;
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnswer = (option: AnswerOption) => {
    setShowWarning(false);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.cau]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      setShowWarning(true);
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      setShowWarning(false);
      setCurrentIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Câu cuối cùng -> Nộp bài
      setShowWarning(false);
      setScreen('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setShowWarning(false);
      setCurrentIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    handleStartQuiz();
  };

  // Đánh giá điểm
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const scoreOutOf10 = ((correctCount / totalQuestions) * 10).toFixed(1);

  const getFeedbackMessage = () => {
    if (correctCount === 30) {
      return {
        title: 'Xuất sắc tuyệt đối! 🌟',
        desc: 'Em đã trả lời chính xác toàn bộ 30/30 câu hỏi! Kiến thức 4 thì cho ngôi I của em cực kỳ vững chắc, rất sẵn sàng cho kỳ thi tuyển sinh lớp 10!',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      };
    }
    if (correctCount >= 25) {
      return {
        title: 'Rất tốt! Làm bài rất tự tin 👏',
        desc: 'Kết quả rất ấn tượng! Em nắm bài rất chắc, hãy xem lại vài câu chưa đúng ở dưới để tránh bẫy đề thi nhé.',
        color: 'text-blue-700 bg-blue-50 border-blue-200',
      };
    }
    if (correctCount >= 18) {
      return {
        title: 'Khá tốt! Cố gắng thêm chút nữa 💪',
        desc: 'Em đã nắm được cấu trúc cơ bản. Hãy chú ý hơn các dấu hiệu thời gian (right now, yesterday, at that time, when...) để nâng cao điểm số.',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
      };
    }
    return {
      title: 'Đừng nản lòng, hãy ôn lại nhé! 📖',
      desc: 'Hãy xem kỹ các câu đúng/sai ở danh sách bên dưới, ghi nhớ công thức và bấm "Làm lại từ đầu" để luyện tập lại nhé!',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
    };
  };

  const filteredQuestions = QUESTIONS.filter(q => {
    const isCorrect = answers[q.cau] === q.dapAn;
    if (resultFilter === 'correct') return isCorrect;
    if (resultFilter === 'wrong') return !isCorrect;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between py-4 px-3 sm:px-6">
      {/* HEADER */}
      <header className="max-w-3xl w-full mx-auto mb-4">
        <div className="bg-white/90 backdrop-blur-md shadow-xs border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Luyện thi vào 10
                </span>
                <span className="text-xs font-semibold text-slate-400">• Tiếng Anh</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-slate-800 leading-tight">
                Tuần 4 — Ôn tập 4 thì cho ngôi I
              </h1>
            </div>
          </div>

          {screen === 'quiz' && (
            <div className="text-right">
              <span className="text-xs font-medium text-slate-500 block">Tiến độ</span>
              <span className="text-sm font-extrabold text-indigo-600">
                {currentIndex + 1} <span className="text-slate-400 font-normal">/ {totalQuestions}</span>
              </span>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-3xl w-full mx-auto flex-1 flex flex-col justify-center">
        {/* ==================== 1. MÀN HÌNH BẮT ĐẦU ==================== */}
        {screen === 'start' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-indigo-100/50 border border-indigo-100 text-center relative overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-indigo-100/60 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-sky-100/60 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Bài ôn tập trắc nghiệm lớp 9</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Tuần 4 — Ôn tập 4 thì <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-indigo-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
                (Hiện tại và Quá khứ) cho ngôi I
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Bài tập gồm <strong>30 câu trắc nghiệm nhanh</strong> chọn 1 trong 4 đáp án A, B, C, D giúp học sinh ghi nhớ bản chất và dạng chia động từ chuẩn xác cho ngôi <strong>"I"</strong>.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-9 text-left">
              <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-3.5 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center mb-2 font-bold text-xs">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">Hiện tại đơn</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">I + V (nguyên mẫu)</p>
                </div>
              </div>

              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-2 font-bold text-xs">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">Hiện tại tiếp diễn</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">I + am + V-ing</p>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3.5 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2 font-bold text-xs">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">Quá khứ đơn</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">I + V2 / V-ed</p>
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3.5 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-2 font-bold text-xs">
                  04
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">Quá khứ tiếp diễn</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">I + was + V-ing</p>
                </div>
              </div>
            </div>

            {/* Quick tips before starting */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-xs sm:text-sm text-slate-600 text-left max-w-xl mx-auto mb-8 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Quy tắc làm bài:</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600 text-xs">
                  <li>Làm lần lượt từng câu hỏi từ 1 đến 30.</li>
                  <li>Chọn 1 đáp án đúng nhất rồi bấm <strong>"Câu tiếp theo"</strong>.</li>
                  <li>Bấm <strong>"Nộp bài"</strong> ở câu 30 để xem điểm số và xem lại chi tiết từng câu.</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-indigo-600 via-indigo-700 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg shadow-indigo-300/50 hover:shadow-indigo-400/50 transition-all duration-200 active:scale-98 cursor-pointer flex items-center justify-center gap-3 mx-auto"
            >
              <span>Bắt đầu làm bài</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ==================== 2. MÀN HÌNH LÀM BÀI ==================== */}
        {screen === 'quiz' && currentQuestion && (
          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl shadow-indigo-100/50 border border-indigo-100">
            {/* Progress Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600 mb-2">
                <span className="flex items-center gap-1.5 text-indigo-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                  Câu hỏi {currentIndex + 1} / {totalQuestions}
                </span>
                <span className="text-slate-500">
                  {Math.round(((currentIndex + 1) / totalQuestions) * 100)}% hoàn thành
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text Box */}
            <div className="bg-linear-to-br from-indigo-50/70 via-sky-50/50 to-white border border-indigo-100/80 rounded-2xl p-5 sm:p-7 mb-6">
              <div className="inline-block bg-indigo-600 text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider mb-3">
                Câu {currentQuestion.cau}
              </div>
              <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                {currentQuestion.hoi}
              </h3>
            </div>

            {/* Answer Options A, B, C, D */}
            <div className="space-y-3 mb-6">
              {(['A', 'B', 'C', 'D'] as AnswerOption[]).map((key) => {
                const text = currentQuestion[key];
                const isSelected = selectedAnswer === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectAnswer(key)}
                    className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all duration-150 flex items-center justify-between group cursor-pointer active:scale-99 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-md shadow-indigo-100 font-semibold'
                        : 'border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                        }`}
                      >
                        {key}
                      </span>
                      <span className="text-base sm:text-lg">{text}</span>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 group-hover:border-indigo-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Warning if trying to next without answering */}
            {showWarning && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-amber-800 text-xs sm:text-sm animate-bounce">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Em hãy chọn 1 đáp án trước khi bấm qua câu tiếp theo nhé!</span>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentIndex === 0}
                className={`px-4 sm:px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
                  currentIndex === 0
                    ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <button
                type="button"
                onClick={handleNextQuestion}
                className={`px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all duration-150 cursor-pointer shadow-md ${
                  currentIndex === totalQuestions - 1
                    ? 'bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                }`}
              >
                {currentIndex === totalQuestions - 1 ? (
                  <>
                    <span>Nộp bài</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ==================== 3. MÀN HÌNH KẾT QUẢ ==================== */}
        {screen === 'result' && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/50 border border-indigo-100 text-center relative overflow-hidden">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-tr from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-200 mb-4">
                <Award className="w-9 h-9" />
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                Kết Quả Bài Làm
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-5">
                Tuần 4 — Ôn tập 4 thì (Hiện tại và Quá khứ) cho ngôi I
              </p>

              {/* Big Score Display */}
              <div className="bg-linear-to-b from-indigo-50/70 to-sky-50/40 border border-indigo-100 rounded-3xl p-6 max-w-md mx-auto mb-6">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">
                  Tổng điểm của em
                </span>
                <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  Em đúng <span className="text-indigo-600">{correctCount}</span>
                  <span className="text-slate-400 text-2xl sm:text-3xl font-bold">/{totalQuestions}</span> câu
                </div>

                <div className="mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
                  <span className="px-3 py-1 bg-white rounded-full shadow-xs border border-indigo-100 text-indigo-700">
                    Điểm số: <strong>{scoreOutOf10}/10</strong>
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full shadow-xs border border-emerald-100 text-emerald-700">
                    Tỷ lệ: <strong>{scorePercent}%</strong>
                  </span>
                </div>
              </div>

              {/* Feedback Message */}
              {(() => {
                const fb = getFeedbackMessage();
                return (
                  <div className={`p-4 rounded-2xl border text-sm max-w-xl mx-auto mb-6 ${fb.color}`}>
                    <h4 className="font-bold text-base mb-1">{fb.title}</h4>
                    <p className="leading-relaxed">{fb.desc}</p>
                  </div>
                );
              })()}

              {/* Button: Làm lại từ đầu */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-7 py-3.5 bg-linear-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold text-base rounded-2xl shadow-md shadow-indigo-200 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Làm lại từ đầu</span>
                </button>
              </div>
            </div>

            {/* Questions Detailed Review */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-indigo-100/50 border border-indigo-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span>Chi tiết câu hỏi & đáp án</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kiểm tra lại từng câu để ghi nhớ dạng bài và sửa các câu sai
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setResultFilter('all')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      resultFilter === 'all'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tất cả (30)
                  </button>
                  <button
                    type="button"
                    onClick={() => setResultFilter('correct')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                      resultFilter === 'correct'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đúng ({correctCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setResultFilter('wrong')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                      resultFilter === 'wrong'
                        ? 'bg-white text-rose-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Sai ({totalQuestions - correctCount})</span>
                  </button>
                </div>
              </div>

              {/* Question list */}
              <div className="space-y-4">
                {filteredQuestions.map((q) => {
                  const studentAnswer = answers[q.cau];
                  const isCorrect = studentAnswer === q.dapAn;

                  return (
                    <div
                      key={q.cau}
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition-colors ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/30'
                          : 'border-rose-200 bg-rose-50/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                            }`}
                          >
                            {q.cau}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {isCorrect ? 'Câu làm đúng' : 'Câu làm chưa đúng'}
                          </span>
                        </div>

                        <div>
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Chính xác
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100/80 px-2.5 py-1 rounded-full">
                              <XCircle className="w-3.5 h-3.5" />
                              Chưa đúng
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Content */}
                      <p className="text-sm sm:text-base font-bold text-slate-800 mb-3.5 leading-snug">
                        {q.hoi}
                      </p>

                      {/* Options Preview */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-3">
                        {(['A', 'B', 'C', 'D'] as AnswerOption[]).map((opt) => {
                          const isKeyCorrect = opt === q.dapAn;
                          const isStudentPick = opt === studentAnswer;

                          let optionStyle = 'bg-slate-50 border-slate-200 text-slate-600';
                          if (isKeyCorrect) {
                            optionStyle = 'bg-emerald-100/90 border-emerald-300 text-emerald-900 font-bold';
                          } else if (isStudentPick && !isCorrect) {
                            optionStyle = 'bg-rose-100/90 border-rose-300 text-rose-900 line-through';
                          }

                          return (
                            <div
                              key={opt}
                              className={`p-2.5 rounded-xl border flex items-center justify-between ${optionStyle}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold">{opt}.</span>
                                <span>{q[opt]}</span>
                              </div>
                              {isKeyCorrect && (
                                <span className="text-[11px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">
                                  Đáp án đúng
                                </span>
                              )}
                              {isStudentPick && !isCorrect && (
                                <span className="text-[11px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded">
                                  Em đã chọn
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Summary Note */}
                      <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 flex items-center justify-between">
                        <span>
                          Em chọn:{' '}
                          <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-600'}>
                            {studentAnswer ? `${studentAnswer} (${q[studentAnswer]})` : 'Chưa chọn'}
                          </strong>
                        </span>
                        <span>
                          Đáp án đúng: <strong className="text-emerald-700">{q.dapAn} ({q[q.dapAn]})</strong>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Restart Button */}
              <div className="mt-8 text-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-200 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại từ đầu</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="max-w-3xl w-full mx-auto mt-6 text-center text-xs text-slate-400 py-3">
        Luyện thi vào 10 • Chuyên đề ngữ pháp Tiếng Anh • Ngôi I (Hiện tại & Quá khứ)
      </footer>
    </div>
  );
}
