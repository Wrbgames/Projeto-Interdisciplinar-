<?php
    include("conexao.php");

    $pedidoSalvo = false;

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $nome = $_POST['nome'] ?? '';
        $endereco = $_POST['endereco'] ?? '';
        $pagamento = $_POST['pagamento'] ?? '';
        $total = $_POST['total'] ?? 0;

        if (empty($nome) || empty($endereco)) {
            die("Preencha todos os campos!");
        }

        try {
            $sql = "INSERT INTO pedidos (nome, endereco, pagamento, total)
                    VALUES (:nome, :endereco, :pagamento, :total)";

            $stmt = $pdo->prepare($sql);

            $stmt->bindParam(":nome", $nome);
            $stmt->bindParam(":endereco", $endereco);
            $stmt->bindParam(":pagamento", $pagamento);
            $stmt->bindParam(":total", $total);

            $stmt->execute();

            $pedidoSalvo = true;

        } catch (PDOException $e) {
            echo "Erro ao salvar: " . $e->getMessage();
        }
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Carrinho - MsPizza</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<nav class="menu">
    <div class="logo">🍕 MsPizza</div>
    <ul>
        <li><a href="index.html">Início</a></li>
        <li><a href="cardapio.html">Cardápio</a></li>
        <li><a href="contato.html">Contato</a></li>
        <li>
            <a href="carrinho.html">
                Carrinho 🛒 <span id="badge" class="badge">0</span>
            </a>
        </li>
    </ul>
</nav>

<section class="carrinho-container">
    <h1>🛒 Seu Carrinho</h1>

    <div id="lista-carrinho"></div>

    <h2>Total: R$ <span id="total">0.00</span></h2>

    <h3>Seus Dados</h3>

    <form method="POST">

        <input type="text" name="nome" placeholder="Seu nome" required>
        <input type="text" name="endereco" placeholder="Seu endereço" required>

        <select name="pagamento">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão">Cartão</option>
            <option value="Pix">Pix</option>
        </select>

        <input type="hidden" name="total" id="totalInput">

        <div class="botoes-carrinho">
            <button type="button" onclick="limparCarrinho()">🗑 Limpar Carrinho</button>
            <button type="submit">✅ Finalizar Pedido</button>
        </div>

    </form>

    <?php if ($pedidoSalvo): ?>
        <script>
            alert("Pedido salvo com sucesso! 🍕");

            // 🔥 LIMPA O CARRINHO
            localStorage.removeItem("carrinho");

            // Atualiza visualmente
            if (typeof atualizarCarrinho === "function") {
                atualizarCarrinho();
            }

            // Opcional: recarrega a página limpa
            window.location.href = "carrinho.php";
        </script>
    <?php endif; ?>

<script src="script.js"></script>
</body>
</html>