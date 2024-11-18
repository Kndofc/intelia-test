<?php

namespace App\Controller;

use App\Service\UserRegistrationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\UserRegistration;
use OpenApi\Attributes as OA;

class UserRegistrationController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserRegistrationService $userService;

    public function __construct(EntityManagerInterface $entityManager, UserRegistrationService $userService)
    {
        $this->entityManager = $entityManager;
        $this->userService = $userService;
    }

    #[Route('/api/user/step1', name: 'user_registration_step1', methods: ['POST'])]
    #[OA\Post(
        summary: 'Salvar informações básicas do usuário',
        description: 'Cadastra o nome completo e a data de nascimento do usuário.',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'name', type: 'string', example: 'João Silva', description: 'Nome completo do usuário'),
                    new OA\Property(property: 'birthdate', type: 'string', format: 'date', example: '1990-01-01', description: 'Data de nascimento no formato AAAA-MM-DD'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Usuário criado com sucesso'),
            new OA\Response(response: 400, description: 'Dados inválidos'),
            new OA\Response(response: 500, description: 'Erro interno')
        ]
    )]
    public function step1(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['name']) || empty($data['birthdate'])) {
            return new JsonResponse(['error' => 'Name and birthdate are required'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $this->userService->saveStep1($data);

        return new JsonResponse(['status' => 'Step 1 completed', 'userId' => $user->getId()], JsonResponse::HTTP_CREATED);
    }

    #[Route('/api/user/step2/{id}', name: 'user_registration_step2', methods: ['POST'])]
    #[OA\Post(
        summary: 'Salvar endereço do usuário',
        description: 'Adiciona o endereço ao cadastro do usuário.',
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID do usuário',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'street', type: 'string', example: 'Rua Principal', description: 'Logradouro do endereço'),
                    new OA\Property(property: 'number', type: 'integer', example: 123, description: 'Número do endereço'),
                    new OA\Property(property: 'zip_code', type: 'string', example: '12345678', description: 'CEP do endereço'),
                    new OA\Property(property: 'city', type: 'string', example: 'São Paulo', description: 'Cidade do endereço'),
                    new OA\Property(property: 'state', type: 'string', example: 'SP', description: 'Estado do endereço'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Endereço salvo com sucesso'),
            new OA\Response(response: 400, description: 'Dados inválidos'),
            new OA\Response(response: 404, description: 'Usuário não encontrado'),
            new OA\Response(response: 500, description: 'Erro interno')
        ]
    )]
    public function step2(Request $request, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['street']) || empty($data['number']) || empty($data['zip_code']) || empty($data['city']) || empty($data['state'])) {
            return new JsonResponse(['error' => 'All address fields are required'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $this->userService->saveStep2($id, $data);

        return new JsonResponse(['status' => 'Step 2 completed'], JsonResponse::HTTP_OK);
    }

    #[Route('/api/user/step3/{id}', name: 'user_registration_step3', methods: ['POST'])]
    #[OA\Post(
        summary: 'Salvar contatos do usuário',
        description: 'Adiciona os contatos (telefone e celular) ao cadastro do usuário.',
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID do usuário',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: 'object',
                properties: [
                    new OA\Property(property: 'phone', type: 'string', example: '(11) 1234-5678', description: 'Telefone fixo do usuário'),
                    new OA\Property(property: 'mobile', type: 'string', example: '(11) 91234-5678', description: 'Celular do usuário'),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'Contatos salvos com sucesso'),
            new OA\Response(response: 400, description: 'Dados inválidos'),
            new OA\Response(response: 404, description: 'Usuário não encontrado'),
            new OA\Response(response: 500, description: 'Erro interno')
        ]
    )]
    public function step3(Request $request, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        if (empty($data['phone']) || empty($data['mobile'])) {
            return new JsonResponse(['error' => 'Phone and mobile are required'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $this->userService->saveStep3($id, $data);
    
        return new JsonResponse(['status' => 'Step 3 completed'], JsonResponse::HTTP_OK);
    }    

    #[Route('/api/user/{id}', name: 'user_registration_detail', methods: ['GET'])]
    #[OA\Get(
        summary: 'Detalhar usuário',
        description: 'Retorna os detalhes de um usuário específico pelo ID.',
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID do usuário',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(response: 200, description: 'Detalhes do usuário retornados com sucesso'),
            new OA\Response(response: 404, description: 'Usuário não encontrado'),
            new OA\Response(response: 500, description: 'Erro interno')
        ]
    )]
    public function detail(int $id): JsonResponse
    {
        $user = $this->userService->findUserDetail($id);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse($user, JsonResponse::HTTP_OK);
    }

    #[Route('/api/users', name: 'user_registration_list', methods: ['GET'])]
    #[OA\Get(
        summary: 'Listar usuários',
        description: 'Lista os usuários cadastrados com paginação.',
        parameters: [
            new OA\Parameter(name: 'page', in: 'query', description: 'Número da página', schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'limit', in: 'query', description: 'Itens por página', schema: new OA\Schema(type: 'integer'))
        ],
        responses: [
            new OA\Response(response: 200, description: 'Lista de usuários retornada com sucesso'),
            new OA\Response(response: 500, description: 'Erro interno')
        ]
    )]
    public function list(Request $request): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);
    
        $repository = $this->entityManager->getRepository(UserRegistration::class);
        $total = $repository->count([]);
        $users = $repository->findBy([], null, $limit, ($page - 1) * $limit);
    
        $data = array_map(fn(UserRegistration $user) => [
            'id' => $user->getId(),
            'name' => $user->getName(),
            'birthdate' => $user->getBirthdate()->format('Y-m-d'),
            'street' => $user->getStreet(),
            'number' => $user->getNumber(),
            'zip_code' => $user->getZipCode(),
            'city' => $user->getCity(),
            'state' => $user->getState(),
            'phone' => $user->getPhone(),
            'mobile' => $user->getMobile(),
        ], $users);
    
        return new JsonResponse([
            'meta' => [
                'total' => $total,
                'page' => $page,
                'pages' => ceil($total / $limit)
            ],
            'data' => $data
        ], JsonResponse::HTTP_OK);
    }
    

    #[Route('/api/user/step/{id}', name: 'user_registration_step_check', methods: ['GET'])]
    #[OA\Get(
        summary: 'Verificar o passo atual do cadastro',
        description: 'Retorna o passo atual de um cadastro pelo ID do usuário.',
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID do usuário',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Passo atual retornado com sucesso',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [
                        new OA\Property(property: 'step', type: 'integer', example: 2, description: 'Número do passo atual')
                    ]
                )
            ),
            new OA\Response(response: 404, description: 'Usuário não encontrado'),
            new OA\Response(response: 500, description: 'Erro interno')
        ]
    )]
    public function getStep(int $id): JsonResponse
    {
        $user = $this->userService->findUser($id);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $step = 1;
        if ($user->getStreet() && $user->getCity()) {
            $step = 3;
        } elseif ($user->getBirthdate()) {
            $step = 2;
        }

        return new JsonResponse(['step' => $step], JsonResponse::HTTP_OK);
    }
    #[Route('/api/health', name: 'api_health_check', methods: ['GET'])]
    public function healthCheck(): JsonResponse
    {
        return new JsonResponse(['status' => 'ok', 'timestamp' => (new \DateTime())->format('c')], JsonResponse::HTTP_OK);
    }
}
