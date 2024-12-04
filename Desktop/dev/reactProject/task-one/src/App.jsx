import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [learningContent, setLearningContent] = useState("");
  const [learningTime, setLearningTime] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // フィールド変更時のハンドラ
  const learningContentChange = (e) => {
    setLearningContent(e.target.value);
  };

  const learningTimeChange = (e) => {
    setLearningTime(e.target.value);
  };

  // レコード追加
  const addContent = async (e) => {
    e.preventDefault();

    if (learningContent.trim() === "" || learningTime.trim() === "") {
      setError(true);
      return;
    }

    // Supabaseにデータを挿入
    const { data, error: insertError } = await supabase
      .from('study_record')
      .insert([{ title: learningContent, time: parseInt(learningTime) }]);

    if (insertError) {
      setError(true);
      console.error('Error inserting record:', insertError);
    } else {
      setLearningContent("");
      setLearningTime("");
      setError(false);
      fetchRecords();  // レコードを再取得して表示を更新
    }
  };

  // 合計学習時間計算
  const totalLearningTime = records.reduce((total, record) => {
    const time = parseFloat(record.time);
    return total + (isNaN(time) ? 0 : time);
  }, 0);

  // Supabaseからレコードを取得する関数
  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('study_record')
      .select('*')
      .order('id', { ascending: false });// 新しいレコードを上に表示

    if (error) {
      console.error('Error fetching records:', error);
    } else {
      setRecords(data);
    }
    setLoading(false);
  };

  // コンポーネントがマウントされたときにレコードを取得
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={addContent}>
          <p className='textColor'>
            学習内容<input type="text" value={learningContent} onChange={learningContentChange} />
          </p>
          <p className='textColor'>
            学習時間<input type="text" value={learningTime} onChange={learningTimeChange} />分
          </p>
          <p className='textColor'>入力されている学習内容:{learningContent}</p>
          <p className='textColor'>入力されている時間:{learningTime}</p>
          <button type='submit'>登録</button>
          {error && <p className='errorText'>入力されてない項目があります</p>}
          <p>合計時間: {totalLearningTime / 60}時間</p>
        </form>

        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {records.map((record, index) => (
                <li className='textColor' key={record.id}>
                  {record.title} - {record.time}分
                  <button onClick={() => deleteContent(record.id)}>削除</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
