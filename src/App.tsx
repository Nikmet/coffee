import { Button, Card, Input, Rate, Tag } from "antd";
import "./App.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCoffeeStore } from "./model/coffeeStore";
import { useEffect, useState } from "react";

function App() {
    const { getCoffeeList, coffeeList } = useCoffeeStore();
    const [text, setText] = useState<string | undefined>();

    const handleSearch = (text: string) => {
        getCoffeeList({ text });
        setText(text);
    };

    useEffect(() => {
        getCoffeeList();
    }, []);

    return (
        <div className="wrapper">
            <Input
                placeholder="Поиск"
                onChange={(e) => handleSearch(e.target.value)}
                value={text}
            />
            <div className="cardsContainer">
                {coffeeList &&
                    coffeeList.map((c) => (
                        <Card
                            key={c.id}
                            cover={<img src={c.image} alt={c.name} />}
                            actions={[<Button icon={<ShoppingCartOutlined />}>{c.price}</Button>]}
                        >
                            <Card.Meta title={c.name} description={c.subTitle} />
                            <Tag color="purple" style={{ marginTop: 12 }}>
                                {c.type}
                            </Tag>
                            <Rate defaultValue={c.rating} disabled allowHalf />
                        </Card>
                    ))}
            </div>
        </div>
    );
}

export default App;
